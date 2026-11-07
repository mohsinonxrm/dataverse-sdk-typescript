import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckHarvestingProvisioningStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckHarvestingProvisioningStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckHarvestingProvisioningStatusResponse;
  }
}
