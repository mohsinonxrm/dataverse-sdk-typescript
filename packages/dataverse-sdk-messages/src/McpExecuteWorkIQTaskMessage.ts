import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the McpExecuteWorkIQTask message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpExecuteWorkIQTaskRequestParameters {
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
 * McpExecuteWorkIQTask request message
 *
 * Web API Action: McpExecuteWorkIQTask
 */
export class McpExecuteWorkIQTaskRequest
  extends OrganizationRequest
  implements Executable<McpExecuteWorkIQTaskResponse>
{
  declare readonly Parameters: Readonly<McpExecuteWorkIQTaskRequestParameters>;

  constructor(parameters: McpExecuteWorkIQTaskRequestParameters) {
    super("McpExecuteWorkIQTask", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpExecuteWorkIQTask`;

    const body = requestBody({
      instructions: this.Parameters.instructions,
      partnerSource: this.Parameters.partnerSource,
      actionId: this.Parameters.actionId,
      actionDecision: this.Parameters.actionDecision,
      skillNames: this.Parameters.skillNames,
      workspaceId: this.Parameters.workspaceId,
      configJson: this.Parameters.configJson,
      workspaceFilesBase64: this.Parameters.workspaceFilesBase64,
      actionReason: this.Parameters.actionReason,
      sessionId: this.Parameters.sessionId,
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
    // The body is the complex value, with its @odata.context
    return McpExecuteWorkIQTaskResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the McpExecuteWorkIQTask action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpExecuteWorkIQTaskResult {
  "@odata.context"?: string;
  results: string;
}

/**
 * McpExecuteWorkIQTask response message
 *
 * `result` is the value the McpExecuteWorkIQTask action returns (see {@link McpExecuteWorkIQTaskResult}).
 */
export class McpExecuteWorkIQTaskResponse extends OrganizationResponse {
  constructor(public result: McpExecuteWorkIQTaskResult) {
    super("McpExecuteWorkIQTask");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): McpExecuteWorkIQTaskResponse {
    return new McpExecuteWorkIQTaskResponse(data as McpExecuteWorkIQTaskResult);
  }
}
