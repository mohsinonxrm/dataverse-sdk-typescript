import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TableOperation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TableOperationResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_TableOperation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TableOperationActionParameters {
  Scenario: string;
  EntityNames?: string;
}

/**
 * msdyn_TableOperation action
 *
 * Unbound action
 */
export class msdyn_TableOperationAction implements Executable<msdyn_TableOperationResponse> {
  constructor(public readonly parameters: msdyn_TableOperationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TableOperation`;

    const body = requestBody({
      Scenario: this.parameters.Scenario,
      EntityNames: this.parameters.EntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_TableOperationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TableOperationResponse;
  }
}
