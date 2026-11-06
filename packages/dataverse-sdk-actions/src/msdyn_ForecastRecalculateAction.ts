import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ForecastRecalculate action
 */
export interface msdyn_ForecastRecalculateResponse {
  // No content returned
}

/**
 * msdyn_ForecastRecalculate action
 *
 * Unbound action
 */
export class msdyn_ForecastRecalculateAction implements Executable<msdyn_ForecastRecalculateResponse> {
  constructor(
    public readonly forecastInstance: EntityReference | AnyEntityPayload,
    public readonly isRefreshHierarchy: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculate`;

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

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
