import { DataverseError } from "../src/errors/DataverseError.js";
import { describe, it, expect, expectTypeOf } from "vitest";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
  DataverseServiceError,
  DataverseNetworkError,
} from "../src/errors/NamedErrors.js";

describe("NamedErrors", () => {
  describe("DataverseError", () => {
    it("creates base error with message", () => {
      const error = new DataverseError("Test error");
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error");
      expect(error.name).toBe("DataverseError");
      expect(error.date).toBeInstanceOf(Date);
    });

    it("preserves stack from base error", () => {
      const baseError = new Error("Base error");
      const error = new DataverseError("Wrapped", baseError);
      expect(error.stack).toBe(baseError.stack);
    });
  });

  describe("DataverseAuthenticationError", () => {
    it("creates empty access token error", () => {
      const error = DataverseAuthenticationError.emptyAccessToken();
      expect(error.name).toBe("EmptyAccessToken");
      expect(error.message).toContain("Access token cannot be null or empty");
    });

    it("creates token acquisition failed error", () => {
      const error = DataverseAuthenticationError.tokenAcquisitionFailed("MSAL error");
      expect(error.name).toBe("TokenAcquisitionFailed");
      expect(error.message).toContain("MSAL error");
    });

    it("creates unauthorized error with status code", () => {
      const error = DataverseAuthenticationError.unauthorized();
      expect(error.name).toBe("Unauthorized");
      expect(error.status).toBe(401);
    });

    it("creates forbidden error with status code", () => {
      const error = DataverseAuthenticationError.forbidden();
      expect(error.name).toBe("Forbidden");
      expect(error.status).toBe(403);
    });
  });

  describe("DataverseInvalidRequestError", () => {
    it("creates empty scopes error", () => {
      const error = DataverseInvalidRequestError.emptyScopes();
      expect(error.name).toBe("EmptyScopes");
      expect(error.message).toContain("Scopes cannot be empty");
    });

    it("creates invalid base URL error", () => {
      const error = DataverseInvalidRequestError.invalidBaseUrl("http://bad");
      expect(error.name).toBe("InvalidBaseUrl");
      expect(error.message).toContain("http://bad");
    });

    it("creates missing parameter error", () => {
      const error = DataverseInvalidRequestError.missingParameter("userId");
      expect(error.name).toBe("MissingParameter");
      expect(error.message).toContain("userId");
    });

    it("creates invalid parameter error", () => {
      const error = DataverseInvalidRequestError.invalidParameter("maxRetries", "must be positive");
      expect(error.name).toBe("InvalidParameter");
      expect(error.message).toContain("maxRetries");
      expect(error.message).toContain("must be positive");
    });

    it("creates serialization failed error", () => {
      const error = DataverseInvalidRequestError.serializationFailed("circular reference");
      expect(error.name).toBe("SerializationFailed");
      expect(error.message).toContain("circular reference");
    });
  });

  describe("DataverseServiceError", () => {
    it("creates service error with status code", () => {
      const error = new DataverseServiceError(400, "Bad request");
      expect(error.status).toBe(400);
      expect(error.message).toBe("Bad request");
    });

    it("creates throttled error", () => {
      const error = DataverseServiceError.throttled(5000);
      expect(error.name).toBe("TooManyRequests");
      expect(error.status).toBe(429);
      expect(error.code).toBe("Throttled");
      expect(error.message).toContain("5000");
    });

    it("creates not found error", () => {
      const error = DataverseServiceError.notFound("account", "123");
      expect(error.name).toBe("NotFound");
      expect(error.status).toBe(404);
      expect(error.message).toContain("account");
      expect(error.message).toContain("123");
    });

    it("creates bad request error", () => {
      const error = DataverseServiceError.badRequest("Invalid filter");
      expect(error.name).toBe("BadRequest");
      expect(error.status).toBe(400);
      expect(error.message).toBe("Invalid filter");
    });

    it("sets error name based on status code", async () => {
      const response404 = new Response(null, { status: 404 });
      const error404 = await DataverseServiceError.fromResponse(response404);
      expect(error404.name).toBe("NotFound");

      const response500 = new Response(null, { status: 500 });
      const error500 = await DataverseServiceError.fromResponse(response500);
      expect(error500.name).toBe("InternalServerError");

      const response503 = new Response(null, { status: 503 });
      const error503 = await DataverseServiceError.fromResponse(response503);
      expect(error503.name).toBe("ServiceUnavailable");
    });

    it("parses OData error format", async () => {
      const errorBody = {
        error: {
          code: "InvalidRequest",
          message: "The request is invalid",
        },
      };
      const response = new Response(JSON.stringify(errorBody), { status: 400 });
      const error = await DataverseServiceError.fromResponse(response, errorBody);

      expect(error.code).toBe("InvalidRequest");
      expect(error.message).toBe("The request is invalid");
      expect(error.body).toEqual(errorBody);
    });

    it("takes the body as unknown (#294)", () => {
      expectTypeOf<
        Parameters<typeof DataverseServiceError.fromResponse>[1]
      >().toEqualTypeOf<unknown>();
    });

    it("reads an OData error from the response when no body is passed", async () => {
      const response = new Response(
        JSON.stringify({ error: { code: "0x80040217", message: "Does Not Exist" } }),
        { status: 404, headers: { "x-ms-service-request-id": "req-1" } }
      );
      const error = await DataverseServiceError.fromResponse(response);
      expect(error.code).toBe("0x80040217");
      expect(error.message).toBe("Does Not Exist");
      expect(error.requestId).toBe("req-1");
    });

    it("keeps a body that isn't JSON as the text (#294)", async () => {
      const response = new Response("<html>Bad Gateway</html>", { status: 502 });
      const error = await DataverseServiceError.fromResponse(response);
      expect(error.status).toBe(502);
      expect(error.message).toBe("HTTP 502");
      expect(error.code).toBeUndefined();
      expect(error.body).toBe("<html>Bad Gateway</html>");
      expect(error.name).toBe("ServerError");
    });

    it("ignores an error body whose code or message isn't a string (#294)", async () => {
      const response = new Response(null, { status: 400 });
      const error = await DataverseServiceError.fromResponse(response, {
        error: { code: 42, message: { text: "nested" } },
      });
      expect(error.code).toBeUndefined();
      expect(error.message).toBe("HTTP 400");
      expect(error.body).toEqual({ error: { code: 42, message: { text: "nested" } } });
    });

    it("keeps a text or array body without reading code or message from it (#294)", async () => {
      const text = await DataverseServiceError.fromResponse(
        new Response(null, { status: 500 }),
        "boom"
      );
      expect(text.body).toBe("boom");
      expect(text.message).toBe("HTTP 500");
      const array = await DataverseServiceError.fromResponse(new Response(null, { status: 400 }), [
        { error: { code: "x" } },
      ]);
      expect(array.code).toBeUndefined();
    });
  });

  describe("DataverseNetworkError", () => {
    it("creates connection failed error", () => {
      const error = DataverseNetworkError.connectionFailed("DNS lookup failed");
      expect(error.name).toBe("ConnectionFailed");
      expect(error.message).toContain("DNS lookup failed");
    });

    it("creates timeout error", () => {
      const error = DataverseNetworkError.timeout(30000);
      expect(error.name).toBe("RequestTimeout");
      expect(error.message).toContain("30000");
    });

    it("creates aborted error", () => {
      const error = DataverseNetworkError.aborted();
      expect(error.name).toBe("RequestAborted");
    });
  });

  describe("Error hierarchy", () => {
    it("maintains proper prototype chain", () => {
      const authError = new DataverseAuthenticationError();
      expect(authError).toBeInstanceOf(DataverseAuthenticationError);
      expect(authError).toBeInstanceOf(DataverseError);
      expect(authError).toBeInstanceOf(Error);

      const serviceError = new DataverseServiceError(400);
      expect(serviceError).toBeInstanceOf(DataverseServiceError);
      expect(serviceError).toBeInstanceOf(DataverseError);
      expect(serviceError).toBeInstanceOf(Error);
    });
  });
});
