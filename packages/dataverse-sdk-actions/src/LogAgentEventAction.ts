import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from LogAgentEvent action
 */
export interface LogAgentEventResponse {
  // No content returned
}

/**
 * Parameters of the LogAgentEvent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LogAgentEventActionParameters {
  ApiVersion: string;
  Activity?: string;
  SimulationId: string;
  Message?: string;
  LogLevel?: string;
  AdditionalInfo?: string;
}

/**
 * LogAgentEvent action
 *
 * Unbound action
 */
export class LogAgentEventAction implements Executable<LogAgentEventResponse> {
  constructor(public readonly parameters: LogAgentEventActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/LogAgentEvent`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      Activity: this.parameters.Activity,
      SimulationId: this.parameters.SimulationId,
      Message: this.parameters.Message,
      LogLevel: this.parameters.LogLevel,
      AdditionalInfo: this.parameters.AdditionalInfo,
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

  async parseResponse(response: Response): Promise<LogAgentEventResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as LogAgentEventResponse;
    return (await response.json()) as LogAgentEventResponse;
  }
}
