import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from pm_RefreshProcessMiningLicensingCapacity action
 */
export interface pm_RefreshProcessMiningLicensingCapacityResponse {
  response: string;
}

/**
 * pm_RefreshProcessMiningLicensingCapacity action
 *
 * Unbound action
 */
export class pm_RefreshProcessMiningLicensingCapacityAction implements Executable<pm_RefreshProcessMiningLicensingCapacityResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pm_RefreshProcessMiningLicensingCapacity`;

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
  ): Promise<pm_RefreshProcessMiningLicensingCapacityResponse> {
    const data = await response.json();
    return data as pm_RefreshProcessMiningLicensingCapacityResponse;
  }
}
