import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OperatingHoursUpgradeFlow action
 */
export interface msdyn_OperatingHoursUpgradeFlowResponse {
  // No content returned
}

/**
 * msdyn_OperatingHoursUpgradeFlow action
 *
 * Unbound action
 */
export class msdyn_OperatingHoursUpgradeFlowAction implements Executable<msdyn_OperatingHoursUpgradeFlowResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OperatingHoursUpgradeFlow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OperatingHoursUpgradeFlowResponse> {
    // No return value (204 No Content)
    return {};
  }
}
