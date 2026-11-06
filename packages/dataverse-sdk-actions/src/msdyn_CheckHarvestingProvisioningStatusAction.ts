import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckHarvestingProvisioningStatus action
 */
export interface msdyn_CheckHarvestingProvisioningStatusResponse {
  HarvestingProvisioningStatus: string;
}

/**
 * msdyn_CheckHarvestingProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_CheckHarvestingProvisioningStatusAction implements Executable<msdyn_CheckHarvestingProvisioningStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckHarvestingProvisioningStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckHarvestingProvisioningStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckHarvestingProvisioningStatusResponse;
    return (await response.json()) as msdyn_CheckHarvestingProvisioningStatusResponse;
  }
}
