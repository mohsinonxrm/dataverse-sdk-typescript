import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SyncODOSProvisioningStatus action
 */
export interface msdyn_SyncODOSProvisioningStatusResponse {
  // No content returned
}

/**
 * msdyn_SyncODOSProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_SyncODOSProvisioningStatusAction implements Executable<msdyn_SyncODOSProvisioningStatusResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncODOSProvisioningStatus`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SyncODOSProvisioningStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
