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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as pm_RefreshProcessMiningLicensingCapacityResponse;
    return (await response.json()) as pm_RefreshProcessMiningLicensingCapacityResponse;
  }
}
