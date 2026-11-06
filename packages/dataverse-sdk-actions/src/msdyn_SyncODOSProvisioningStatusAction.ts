import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SyncODOSProvisioningStatus action
 */
export interface msdyn_SyncODOSProvisioningStatusResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SyncODOSProvisioningStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncODOSProvisioningStatusActionParameters {
  InputData: string;
}

/**
 * msdyn_SyncODOSProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_SyncODOSProvisioningStatusAction implements Executable<msdyn_SyncODOSProvisioningStatusResponse> {
  constructor(public readonly parameters: msdyn_SyncODOSProvisioningStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncODOSProvisioningStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SyncODOSProvisioningStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SyncODOSProvisioningStatusResponse;
    return (await response.json()) as msdyn_SyncODOSProvisioningStatusResponse;
  }
}
