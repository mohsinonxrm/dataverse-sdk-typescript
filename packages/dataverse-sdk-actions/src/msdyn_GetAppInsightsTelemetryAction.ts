import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAppInsightsTelemetry action
 */
export interface msdyn_GetAppInsightsTelemetryResponse {
  msdyn_Response: string;
}

/**
 * msdyn_GetAppInsightsTelemetry action
 *
 * Unbound action
 */
export class msdyn_GetAppInsightsTelemetryAction implements Executable<msdyn_GetAppInsightsTelemetryResponse> {
  constructor(
    public readonly msdyn_Query: string,
    public readonly msdyn_Timespan?: string,
    public readonly msdyn_LiveWorkItemIds?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAppInsightsTelemetry`;

    const body: Record<string, unknown> = {
      msdyn_Query: this.msdyn_Query,
      msdyn_Timespan: this.msdyn_Timespan,
      msdyn_LiveWorkItemIds: this.msdyn_LiveWorkItemIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetAppInsightsTelemetryResponse> {
    const data = await response.json();
    return data as msdyn_GetAppInsightsTelemetryResponse;
  }
}
