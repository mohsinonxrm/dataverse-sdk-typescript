import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetIoTVisualizationSummary action
 */
export interface msdyn_GetIoTVisualizationSummaryResponse {
  SummaryOutput: string;
}

/**
 * Parameters of the msdyn_GetIoTVisualizationSummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIoTVisualizationSummaryActionParameters {
  DeviceId: string;
  ConfigurationTypeId: string;
}

/**
 * msdyn_GetIoTVisualizationSummary action
 *
 * Unbound action
 */
export class msdyn_GetIoTVisualizationSummaryAction implements Executable<msdyn_GetIoTVisualizationSummaryResponse> {
  constructor(public readonly parameters: msdyn_GetIoTVisualizationSummaryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTVisualizationSummary`;

    const body = requestBody({
      DeviceId: this.parameters.DeviceId,
      ConfigurationTypeId: this.parameters.ConfigurationTypeId,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTVisualizationSummaryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetIoTVisualizationSummaryResponse;
  }
}
