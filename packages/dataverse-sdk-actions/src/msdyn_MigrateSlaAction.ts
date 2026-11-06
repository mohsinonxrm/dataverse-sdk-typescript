import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_MigrateSla action
 */
export interface msdyn_MigrateSlaResponse {
  OutputString: string;
  Exception: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_MigrateSlaResponse;
  }
}
