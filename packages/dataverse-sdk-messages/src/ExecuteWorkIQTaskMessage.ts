import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content is an empty result
    if (response.status === 204) return ExecuteWorkIQTaskResponse.fromResponse({});
    return ExecuteWorkIQTaskResponse.fromResponse(await response.json());
  }
}

/**
 * ExecuteWorkIQTask response message
 */
export class ExecuteWorkIQTaskResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("ExecuteWorkIQTask");
  }

  static fromResponse(data: unknown): ExecuteWorkIQTaskResponse {
    return new ExecuteWorkIQTaskResponse(responseObject<Record<string, unknown>>(data));
  }
}
