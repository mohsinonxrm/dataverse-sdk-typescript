import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetIoTVisualizationSummary action
 */
export interface msdyn_GetIoTVisualizationSummaryResponse {
  SummaryOutput: string;
}

/**
 * msdyn_GetIoTVisualizationSummary action
 *
 * Unbound action
 */
export class msdyn_GetIoTVisualizationSummaryAction implements Executable<msdyn_GetIoTVisualizationSummaryResponse> {
  constructor(
    public readonly deviceId: string,
    public readonly configurationTypeId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTVisualizationSummary`;

    const body: Record<string, unknown> = {
      DeviceId: this.deviceId,
      ConfigurationTypeId: this.configurationTypeId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetIoTVisualizationSummaryResponse> {
    const data = await response.json();
    return data as msdyn_GetIoTVisualizationSummaryResponse;
  }
}
