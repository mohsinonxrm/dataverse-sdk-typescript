import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_MigrateSla action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MigrateSlaResponse {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
}

/**
 * Parameters of the msdyn_MigrateSla action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateSlaActionParameters {
  SlaMigrationRequest: string;
}

/**
 * msdyn_MigrateSla action
 *
 * Unbound action
 */
export class msdyn_MigrateSlaAction implements Executable<msdyn_MigrateSlaResponse> {
  constructor(public readonly parameters: msdyn_MigrateSlaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSla`;

    const body = requestBody({
      SlaMigrationRequest: this.parameters.SlaMigrationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateSlaResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_MigrateSlaResponse;
  }
}
