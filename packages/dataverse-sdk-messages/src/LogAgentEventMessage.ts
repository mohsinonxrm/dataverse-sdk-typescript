import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the LogAgentEvent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LogAgentEventRequestParameters {
  ApiVersion: string;
  Activity?: string;
  SimulationId: string;
  Message?: string;
  LogLevel?: string;
  AdditionalInfo?: string;
}

/**
 * LogAgentEvent request message
 *
 * Web API Action: LogAgentEvent
 */
export class LogAgentEventRequest
  extends OrganizationRequest
  implements Executable<LogAgentEventResponse>
{
  declare readonly Parameters: Readonly<LogAgentEventRequestParameters>;

  constructor(parameters: LogAgentEventRequestParameters) {
    super("LogAgentEvent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/LogAgentEvent`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      Activity: this.Parameters.Activity,
      SimulationId: this.Parameters.SimulationId,
      Message: this.Parameters.Message,
      LogLevel: this.Parameters.LogLevel,
      AdditionalInfo: this.Parameters.AdditionalInfo,
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
    // No return value (204 No Content)
    return Promise.resolve(new LogAgentEventResponse());
  }
}

/**
 * LogAgentEvent response message
 */
export class LogAgentEventResponse extends OrganizationResponse {
  constructor() {
    super("LogAgentEvent");
  }

  static fromResponse(_data?: unknown): LogAgentEventResponse {
    return new LogAgentEventResponse();
  }
}
