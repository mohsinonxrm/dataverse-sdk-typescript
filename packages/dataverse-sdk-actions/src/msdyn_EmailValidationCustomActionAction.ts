import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_EmailValidationCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailValidationCustomActionResponse {
  "@odata.context"?: string;
  EmailValidationResponse: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
}

/**
 * Parameters of the msdyn_EmailValidationCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailValidationCustomActionActionParameters {
  EmailValidationRequest?: string;
}

/**
 * msdyn_EmailValidationCustomAction action
 *
 * Unbound action
 */
export class msdyn_EmailValidationCustomActionAction implements Executable<msdyn_EmailValidationCustomActionResponse> {
  constructor(public readonly parameters: msdyn_EmailValidationCustomActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailValidationCustomAction`;

    const body = requestBody({
      EmailValidationRequest: this.parameters.EmailValidationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_EmailValidationCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_EmailValidationCustomActionResponse;
  }
}
