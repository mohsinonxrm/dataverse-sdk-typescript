import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ForecastRecalculateAll action
 */
export interface msdyn_ForecastRecalculateAllResponse {
  // No content returned
}

/**
 * msdyn_ForecastRecalculateAll action
 *
 * Unbound action
 */
export class msdyn_ForecastRecalculateAllAction implements Executable<msdyn_ForecastRecalculateAllResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculateAll`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateAllResponse> {
    // No return value (204 No Content)
    return {};
  }
}
