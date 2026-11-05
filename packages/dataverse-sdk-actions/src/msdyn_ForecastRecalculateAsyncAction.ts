import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_ForecastRecalculateAsync action
 */
export interface msdyn_ForecastRecalculateAsyncResponse {
  // No content returned
}

/**
 * msdyn_ForecastRecalculateAsync action
 *
 * Unbound action
 */
export class msdyn_ForecastRecalculateAsyncAction implements Executable<msdyn_ForecastRecalculateAsyncResponse> {
  constructor(
    public readonly forecastInstance: EntityReference,
    public readonly isRefreshHierarchy: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculateAsync`;

    const body: Record<string, unknown> = {
      ForecastInstance: this.forecastInstance,
      IsRefreshHierarchy: this.isRefreshHierarchy,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateAsyncResponse> {
    // No return value (204 No Content)
    return {};
  }
}
