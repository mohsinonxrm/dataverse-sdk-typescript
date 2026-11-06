import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from McpExecuteWorkIQTask action
 */
export interface McpExecuteWorkIQTaskResponse {
  results: string;
}

/**
 * Parameters of the McpExecuteWorkIQTask action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpExecuteWorkIQTaskActionParameters {
  instructions?: string;
  partnerSource?: string;
  actionId?: string;
  actionDecision?: string;
  skillNames?: string[];
  workspaceId: string;
  configJson?: string;
  workspaceFilesBase64?: string;
  actionReason?: string;
  sessionId?: string;
}

/**
 * McpExecuteWorkIQTask action
 *
 * Unbound action
 */
export class McpExecuteWorkIQTaskAction implements Executable<McpExecuteWorkIQTaskResponse> {
  constructor(public readonly parameters: McpExecuteWorkIQTaskActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpExecuteWorkIQTask`;

    const body = requestBody({
      instructions: this.parameters.instructions,
      partnerSource: this.parameters.partnerSource,
      actionId: this.parameters.actionId,
      actionDecision: this.parameters.actionDecision,
      skillNames: this.parameters.skillNames,
      workspaceId: this.parameters.workspaceId,
      configJson: this.parameters.configJson,
      workspaceFilesBase64: this.parameters.workspaceFilesBase64,
      actionReason: this.parameters.actionReason,
      sessionId: this.parameters.sessionId,
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

  async parseResponse(response: Response): Promise<McpExecuteWorkIQTaskResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as McpExecuteWorkIQTaskResponse;
    return (await response.json()) as McpExecuteWorkIQTaskResponse;
  }
}
