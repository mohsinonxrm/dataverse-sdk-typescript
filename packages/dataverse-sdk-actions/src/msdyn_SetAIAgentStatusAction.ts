import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_aiagentstatus } from "./types/index.js";

/**
 * Response from the msdyn_SetAIAgentStatus action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_SetAIAgentStatusResponse =
  | (msdyn_aiagentstatus & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * Parameters of the msdyn_SetAIAgentStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetAIAgentStatusActionParameters {
  FallbackReasonCode?: number;
  AIAgentExternalActionStatus?: number;
  Entity: EntityReference | AnyEntityPayload;
  ShouldOverrideEscalate?: boolean;
  AIAgentRunStartTime?: string;
  AgentMode?: number;
  ErrorForLog?: string;
  AIAgentStatus: string;
  RunId?: string;
  AgentLastAction?: number;
  SourceForLog?: string;
  AutomationLevel?: string;
  LastEmailActivity?: EntityReference | AnyEntityPayload;
  EmailsSent?: number;
}

/**
 * msdyn_SetAIAgentStatus action
 *
 * Unbound action
 */
export class msdyn_SetAIAgentStatusAction implements Executable<msdyn_SetAIAgentStatusResponse> {
  constructor(public readonly parameters: msdyn_SetAIAgentStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetAIAgentStatus`;

    const body = requestBody({
      FallbackReasonCode: this.parameters.FallbackReasonCode,
      AIAgentExternalActionStatus: this.parameters.AIAgentExternalActionStatus,
      Entity: this.parameters.Entity,
      ShouldOverrideEscalate: this.parameters.ShouldOverrideEscalate,
      AIAgentRunStartTime: this.parameters.AIAgentRunStartTime,
      AgentMode: this.parameters.AgentMode,
      ErrorForLog: this.parameters.ErrorForLog,
      AIAgentStatus: this.parameters.AIAgentStatus,
      RunId: this.parameters.RunId,
      AgentLastAction: this.parameters.AgentLastAction,
      SourceForLog: this.parameters.SourceForLog,
      AutomationLevel: this.parameters.AutomationLevel,
      LastEmailActivity: this.parameters.LastEmailActivity,
      EmailsSent: this.parameters.EmailsSent,
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

  async parseResponse(response: Response): Promise<msdyn_SetAIAgentStatusResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_SetAIAgentStatusResponse;
  }
}
