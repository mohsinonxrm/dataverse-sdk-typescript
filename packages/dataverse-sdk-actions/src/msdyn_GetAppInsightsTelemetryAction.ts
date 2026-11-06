import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAppInsightsTelemetry action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAppInsightsTelemetryResponse {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_GetAppInsightsTelemetry action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAppInsightsTelemetryActionParameters {
  msdyn_Timespan?: string;
  msdyn_LiveWorkItemIds?: string;
  msdyn_Query: string;
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
      msdyn_Timespan: this.parameters.msdyn_Timespan,
      msdyn_LiveWorkItemIds: this.parameters.msdyn_LiveWorkItemIds,
      msdyn_Query: this.parameters.msdyn_Query,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAppInsightsTelemetryResponse;
  }
}
