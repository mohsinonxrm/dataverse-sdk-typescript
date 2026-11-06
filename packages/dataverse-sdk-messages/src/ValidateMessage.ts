import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  TypedActivitypointer,
  ValidateResponse as ValidateResponseData,
} from "./types/index.js";

/**
 * Parameters of the Validate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateRequestParameters {
  Activities: TypedActivitypointer[];
}

/**
 * Validate request message
 *
 * Web API Action: Validate
 */
export class ValidateRequest extends OrganizationRequest implements Executable<ValidateResponse> {
  declare readonly Parameters: Readonly<ValidateRequestParameters>;

  constructor(parameters: ValidateRequestParameters) {
    super("Validate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Validate`;

    const body = requestBody({
      Activities: this.Parameters.Activities,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ValidateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ValidateResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * Validate response message
 */
export class ValidateResponse extends OrganizationResponse {
  constructor(public result: ValidateResponseData) {
    super("Validate");
  }

  static fromResponse(data: unknown): ValidateResponse {
    return new ValidateResponse(responseObject<ValidateResponseData>(data));
  }
}
