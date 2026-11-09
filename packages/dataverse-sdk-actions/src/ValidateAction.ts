import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { TypedActivitypointer, ValidationResult } from "./types/index.js";

/**
 * Response from the Validate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ValidateResponse;
  }
}
