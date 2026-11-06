import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the LogAgentEvent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type LogAgentEventResponse = void;

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

  parseResponse(_response: Response): Promise<LogAgentEventResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
