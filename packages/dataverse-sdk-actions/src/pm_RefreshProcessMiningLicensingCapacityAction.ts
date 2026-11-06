import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the pm_RefreshProcessMiningLicensingCapacity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface pm_RefreshProcessMiningLicensingCapacityResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as pm_RefreshProcessMiningLicensingCapacityResponse;
  }
}
