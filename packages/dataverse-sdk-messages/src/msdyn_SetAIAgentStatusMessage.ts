import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_aiagentstatus } from "./types/index.js";

/**
 * Parameters of the msdyn_SetAIAgentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetAIAgentStatusRequestParameters {
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
 * msdyn_SetAIAgentStatus request message
 *
 * Web API Action: msdyn_SetAIAgentStatus
 */
export class msdyn_SetAIAgentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetAIAgentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetAIAgentStatusRequestParameters>;

  constructor(parameters: msdyn_SetAIAgentStatusRequestParameters) {
    super("msdyn_SetAIAgentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetAIAgentStatus`;

    const body = requestBody({
      FallbackReasonCode: this.Parameters.FallbackReasonCode,
      AIAgentExternalActionStatus: this.Parameters.AIAgentExternalActionStatus,
      Entity: this.Parameters.Entity,
      ShouldOverrideEscalate: this.Parameters.ShouldOverrideEscalate,
      AIAgentRunStartTime: this.Parameters.AIAgentRunStartTime,
      AgentMode: this.Parameters.AgentMode,
      ErrorForLog: this.Parameters.ErrorForLog,
      AIAgentStatus: this.Parameters.AIAgentStatus,
      RunId: this.Parameters.RunId,
      AgentLastAction: this.Parameters.AgentLastAction,
      SourceForLog: this.Parameters.SourceForLog,
      AutomationLevel: this.Parameters.AutomationLevel,
      LastEmailActivity: this.Parameters.LastEmailActivity,
      EmailsSent: this.Parameters.EmailsSent,
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
    if (response.status === 204) return msdyn_SetAIAgentStatusResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_SetAIAgentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SetAIAgentStatus action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_SetAIAgentStatusResult =
  | (msdyn_aiagentstatus & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * msdyn_SetAIAgentStatus response message
 *
 * `result` is the value the msdyn_SetAIAgentStatus action returns (see {@link msdyn_SetAIAgentStatusResult}).
 */
export class msdyn_SetAIAgentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetAIAgentStatusResult) {
    super("msdyn_SetAIAgentStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SetAIAgentStatusResponse {
    return new msdyn_SetAIAgentStatusResponse((data ?? null) as msdyn_SetAIAgentStatusResult);
  }
}
