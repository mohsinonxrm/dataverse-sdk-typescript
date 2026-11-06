import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TableOperation action
 */
export interface msdyn_TableOperationResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TableOperationResponse;
    return (await response.json()) as msdyn_TableOperationResponse;
  }
}
