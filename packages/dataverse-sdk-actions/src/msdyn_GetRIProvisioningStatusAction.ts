import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRIProvisioningStatus action
 */
export interface msdyn_GetRIProvisioningStatusResponse {
  DCIHubPlanType: string;
  EEProvisioningStatus: number;
  RIProvisioningStatus: number;
  RIErrorStatusCode: string;
  RIErrorStatusMessage: string;
}

/**
 * msdyn_GetRIProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_GetRIProvisioningStatusAction implements Executable<msdyn_GetRIProvisioningStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRIProvisioningStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRIProvisioningStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetRIProvisioningStatusResponse;
  }
}
