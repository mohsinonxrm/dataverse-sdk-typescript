import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_MigrateFeaturesToCoreService action
 */
export interface msdyn_MigrateFeaturesToCoreServiceResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_MigrateFeaturesToCoreService action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateFeaturesToCoreServiceActionParameters {
  InputData: string;
}

/**
 * msdyn_MigrateFeaturesToCoreService action
 *
 * Unbound action
 */
export class msdyn_MigrateFeaturesToCoreServiceAction implements Executable<msdyn_MigrateFeaturesToCoreServiceResponse> {
  constructor(public readonly parameters: msdyn_MigrateFeaturesToCoreServiceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateFeaturesToCoreService`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateFeaturesToCoreServiceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_MigrateFeaturesToCoreServiceResponse;
    return (await response.json()) as msdyn_MigrateFeaturesToCoreServiceResponse;
  }
}
