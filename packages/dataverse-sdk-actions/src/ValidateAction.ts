import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { TypedActivitypointer, ValidationResult } from "./types/index.js";

/**
 * Response from Validate action
 */
export interface ValidateResponse {
  Result: ValidationResult[];
}

/**
 * Parameters of the Validate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateActionParameters {
  Activities: TypedActivitypointer[];
}

/**
 * Validate action
 *
 * Unbound action
 */
export class ValidateAction implements Executable<ValidateResponse> {
  constructor(public readonly parameters: ValidateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Validate`;

    const body = requestBody({
      Activities: this.parameters.Activities,
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
    return (text ? JSON.parse(text) : {}) as ValidateResponse;
  }
}
