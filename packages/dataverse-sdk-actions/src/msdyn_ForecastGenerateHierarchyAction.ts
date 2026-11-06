import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_forecastdefinition } from "./types/index.js";

/**
 * Response from msdyn_ForecastGenerateHierarchy action
 */
export interface msdyn_ForecastGenerateHierarchyResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_ForecastGenerateHierarchy action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastGenerateHierarchyActionParameters {
  ForecastDefinition: EntityReference | EntityPayload<msdyn_forecastdefinition>;
  IsRefresh: boolean;
  RecurrenceIndex?: number;
}

/**
 * msdyn_ForecastGenerateHierarchy action
 *
 * Unbound action
 */
export class msdyn_ForecastGenerateHierarchyAction implements Executable<msdyn_ForecastGenerateHierarchyResponse> {
  constructor(public readonly parameters: msdyn_ForecastGenerateHierarchyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastGenerateHierarchy`;

    const body = requestBody({
      ForecastDefinition: this.parameters.ForecastDefinition,
      IsRefresh: this.parameters.IsRefresh,
      RecurrenceIndex: this.parameters.RecurrenceIndex,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ForecastGenerateHierarchyResponse;
  }
}
