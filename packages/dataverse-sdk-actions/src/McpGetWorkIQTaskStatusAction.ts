import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from McpGetWorkIQTaskStatus action
 */
export interface McpGetWorkIQTaskStatusResponse {
  results: string;
}

/**
 * Parameters of the McpGetWorkIQTaskStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpGetWorkIQTaskStatusActionParameters {
  sessionId: string;
  workspaceId: string;
}

/**
 * McpGetWorkIQTaskStatus action
 *
 * Unbound action
 */
export class McpGetWorkIQTaskStatusAction implements Executable<McpGetWorkIQTaskStatusResponse> {
  constructor(public readonly parameters: McpGetWorkIQTaskStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpGetWorkIQTaskStatus`;

    const body = requestBody({
      sessionId: this.parameters.sessionId,
      workspaceId: this.parameters.workspaceId,
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

  async parseResponse(response: Response): Promise<McpGetWorkIQTaskStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as McpGetWorkIQTaskStatusResponse;
    return (await response.json()) as McpGetWorkIQTaskStatusResponse;
  }
}
