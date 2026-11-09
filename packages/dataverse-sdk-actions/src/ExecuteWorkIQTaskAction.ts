import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ExecuteWorkIQTask action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteWorkIQTaskResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the ExecuteWorkIQTask action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteWorkIQTaskActionParameters {
  instructions?: string;
  workspaceId: string;
  sessionId?: string;
  skillNames?: string[];
  configJson?: string;
  workspaceFilesBase64?: string;
  partnerSource?: string;
  actionReason?: string;
  actionDecision?: string;
  actionId?: string;
}

/**
 * ExecuteWorkIQTask action
 *
 * Unbound action
 */
export class ExecuteWorkIQTaskAction implements Executable<ExecuteWorkIQTaskResponse> {
  constructor(public readonly parameters: ExecuteWorkIQTaskActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExecuteWorkIQTask`;

    const body = requestBody({
      instructions: this.parameters.instructions,
      workspaceId: this.parameters.workspaceId,
      sessionId: this.parameters.sessionId,
      skillNames: this.parameters.skillNames,
      configJson: this.parameters.configJson,
      workspaceFilesBase64: this.parameters.workspaceFilesBase64,
      partnerSource: this.parameters.partnerSource,
      actionReason: this.parameters.actionReason,
      actionDecision: this.parameters.actionDecision,
      actionId: this.parameters.actionId,
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

  async parseResponse(response: Response): Promise<ExecuteWorkIQTaskResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as ExecuteWorkIQTaskResponse;
  }
}
