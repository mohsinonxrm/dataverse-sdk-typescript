import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { McpExecuteWorkIQTaskResponse as McpExecuteWorkIQTaskResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return McpExecuteWorkIQTaskResponse.fromResponse({});
    return McpExecuteWorkIQTaskResponse.fromResponse(await response.json());
  }
}

/**
 * McpExecuteWorkIQTask response message
 */
export class McpExecuteWorkIQTaskResponse extends OrganizationResponse {
  constructor(public result: McpExecuteWorkIQTaskResponseData) {
    super("McpExecuteWorkIQTask");
  }

  static fromResponse(data: unknown): McpExecuteWorkIQTaskResponse {
    return new McpExecuteWorkIQTaskResponse(responseObject<McpExecuteWorkIQTaskResponseData>(data));
  }
}
