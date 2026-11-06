import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_forecastdefinition } from "./types/index.js";

/**
 * Response from msdyn_ForecastGenerateHierarchy action
 */
export interface msdyn_ForecastGenerateHierarchyResponse {
  value: EntityReference[];
}

/**
 * msdyn_ForecastGenerateHierarchy action
 *
 * Unbound action
 */
export class msdyn_ForecastGenerateHierarchyAction implements Executable<msdyn_ForecastGenerateHierarchyResponse> {
  constructor(
    public readonly forecastDefinition: EntityReference | EntityPayload<msdyn_forecastdefinition>,
    public readonly isRefresh: boolean,
    public readonly recurrenceIndex?: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastGenerateHierarchy`;

    const body: Record<string, unknown> = {
      ForecastDefinition: this.forecastDefinition,
      IsRefresh: this.isRefresh,
      RecurrenceIndex: this.recurrenceIndex,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastGenerateHierarchyResponse> {
    const data = await response.json();
    return data as msdyn_ForecastGenerateHierarchyResponse;
  }
}
