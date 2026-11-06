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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetRIProvisioningStatusResponse;
    return (await response.json()) as msdyn_GetRIProvisioningStatusResponse;
  }
}
