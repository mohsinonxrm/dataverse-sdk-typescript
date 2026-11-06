import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAppInsightsTelemetry action
 */
export interface msdyn_GetAppInsightsTelemetryResponse {
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_GetAppInsightsTelemetry action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAppInsightsTelemetryActionParameters {
  msdyn_Query: string;
  msdyn_Timespan?: string;
  msdyn_LiveWorkItemIds?: string;
}

/**
 * msdyn_GetAppInsightsTelemetry action
 *
 * Unbound action
 */
export class msdyn_GetAppInsightsTelemetryAction implements Executable<msdyn_GetAppInsightsTelemetryResponse> {
  constructor(public readonly parameters: msdyn_GetAppInsightsTelemetryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAppInsightsTelemetry`;

    const body = requestBody({
      msdyn_Query: this.parameters.msdyn_Query,
      msdyn_Timespan: this.parameters.msdyn_Timespan,
      msdyn_LiveWorkItemIds: this.parameters.msdyn_LiveWorkItemIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetAppInsightsTelemetryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAppInsightsTelemetryResponse;
    return (await response.json()) as msdyn_GetAppInsightsTelemetryResponse;
  }
}
