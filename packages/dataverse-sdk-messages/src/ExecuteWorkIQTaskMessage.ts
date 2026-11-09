import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ExecuteWorkIQTask message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteWorkIQTaskRequestParameters {
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
 * ExecuteWorkIQTask request message
 *
 * Web API Action: ExecuteWorkIQTask
 */
export class ExecuteWorkIQTaskRequest
  extends OrganizationRequest
  implements Executable<ExecuteWorkIQTaskResponse>
{
  declare readonly Parameters: Readonly<ExecuteWorkIQTaskRequestParameters>;

  constructor(parameters: ExecuteWorkIQTaskRequestParameters) {
    super("ExecuteWorkIQTask", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExecuteWorkIQTask`;

    const body = requestBody({
      instructions: this.Parameters.instructions,
      workspaceId: this.Parameters.workspaceId,
      sessionId: this.Parameters.sessionId,
      skillNames: this.Parameters.skillNames,
      configJson: this.Parameters.configJson,
      workspaceFilesBase64: this.Parameters.workspaceFilesBase64,
      partnerSource: this.Parameters.partnerSource,
      actionReason: this.Parameters.actionReason,
      actionDecision: this.Parameters.actionDecision,
      actionId: this.Parameters.actionId,
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
    if (response.status === 204) return ExecuteWorkIQTaskResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ExecuteWorkIQTaskResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExecuteWorkIQTask action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteWorkIQTaskResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * ExecuteWorkIQTask response message
 *
 * `result` is the value the ExecuteWorkIQTask action returns (see {@link ExecuteWorkIQTaskResult}).
 */
export class ExecuteWorkIQTaskResponse extends OrganizationResponse {
  constructor(public result: ExecuteWorkIQTaskResult) {
    super("ExecuteWorkIQTask");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExecuteWorkIQTaskResponse {
    return new ExecuteWorkIQTaskResponse((data ?? null) as ExecuteWorkIQTaskResult);
  }
}
