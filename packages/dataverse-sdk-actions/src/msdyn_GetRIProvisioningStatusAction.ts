import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetRIProvisioningStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRIProvisioningStatusResponse {
  "@odata.context"?: string;
  DCIHubPlanType: string;
  EEProvisioningStatus: number;
  RIErrorStatusCode: string;
  RIErrorStatusMessage: string;
  RIProvisioningStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetRIProvisioningStatusResponse;
  }
}
