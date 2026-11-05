import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { Executable } from "../src/abstractions/executable.js";
import type { RequestInformation } from "../src/abstractions/http.js";
import { Prefer } from "../src/abstractions/options.js";

const BASE_URL = "https://org.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;

const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

// Mock Function (GET)
interface MockFunctionResponse {
  Value: string;
}

class MockFunction implements Executable<MockFunctionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "GET",
      url: `${baseUrl}/MockFunction`,
      headers: {},
    };
  }

  async parseResponse(response: Response): Promise<MockFunctionResponse> {
    const data = await response.json();
    return { Value: data.Value };
  }
}

// Mock Action (POST)
interface MockActionResponse {
  Result: number;
}

class MockAction implements Executable<MockActionResponse> {
  constructor(public readonly input: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "POST",
      url: `${baseUrl}/MockAction`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        Input: this.input,
      },
    };
  }

  async parseResponse(response: Response): Promise<MockActionResponse> {
    const data = await response.json();
    return { Result: data.Result };
  }
}

// Mock Action with no content response (204)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MockNoContentResponse {
  // Empty
}

class MockNoContentAction implements Executable<MockNoContentResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    return {
      method: "POST",
      url: `${baseUrl}/MockNoContentAction`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    };
  }

  parseResponse(_response: Response): Promise<MockNoContentResponse> {
    return Promise.resolve({});
  }
}

describe("DataverseClient.execute()", () => {
  it("executes a function (GET) successfully", async () => {
    server.use(
      http.get(`${API_URL}/MockFunction`, () => {
        return HttpResponse.json({ Value: "test-value" });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const mockFunction = new MockFunction();
    const response = await client.execute(mockFunction);

    expect(response.Value).toBe("test-value");
  });

  it("executes an action (POST) successfully", async () => {
    server.use(
      http.post(`${API_URL}/MockAction`, async ({ request }) => {
        const body = (await request.json()) as { Input: number };
        return HttpResponse.json({ Result: body.Input * 2 });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const mockAction = new MockAction(5);
    const response = await client.execute(mockAction);

    expect(response.Result).toBe(10);
  });

  it("handles 204 No Content responses", async () => {
    server.use(
      http.post(`${API_URL}/MockNoContentAction`, () => {
        return new HttpResponse(null, { status: 204 });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const mockAction = new MockNoContentAction();
    const response = await client.execute(mockAction);

    expect(response).toEqual({});
  });

  it("throws error on non-ok response", async () => {
    server.use(
      http.get(`${API_URL}/MockFunction`, () => {
        return HttpResponse.json(
          {
            error: {
              code: "MockError",
              message: "Mock error message",
            },
          },
          { status: 400 }
        );
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const mockFunction = new MockFunction();

    await expect(client.execute(mockFunction)).rejects.toThrow();
  });

  it("applies request options to executable", async () => {
    let capturedHeaders: Headers | undefined;
    server.use(
      http.get(`${API_URL}/MockFunction`, ({ request }) => {
        capturedHeaders = request.headers;
        return HttpResponse.json({ Value: "test" });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const mockFunction = new MockFunction();

    await client.execute(mockFunction, {
      headers: { "X-Custom-Header": "custom-value" },
      prefer: [Prefer.returnRepresentation()],
    });

    expect(capturedHeaders?.get("X-Custom-Header")).toBe("custom-value");
    expect(capturedHeaders?.get("prefer")).toContain("return=representation");
  });
});
