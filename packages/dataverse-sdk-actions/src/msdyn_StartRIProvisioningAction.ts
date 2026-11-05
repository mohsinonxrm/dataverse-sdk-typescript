import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_StartRIProvisioning action
 */
export interface msdyn_StartRIProvisioningResponse {
  // No content returned
}

/**
 * msdyn_StartRIProvisioning action
 *
 * Unbound action
 */
export class msdyn_StartRIProvisioningAction implements Executable<msdyn_StartRIProvisioningResponse> {
  constructor(
    public readonly hubName: string,
    public readonly primaryKey: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartRIProvisioning`;

    const body: Record<string, unknown> = {
      HubName: this.hubName,
      PrimaryKey: this.primaryKey,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_StartRIProvisioningResponse> {
    // No return value (204 No Content)
    return {};
  }
}
