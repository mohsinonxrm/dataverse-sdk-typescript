import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SyncActionExecutionStateFromAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncActionExecutionStateFromAgentRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_TargetEntityTypeName: string;
  msdyn_ActionState: number;
  msdyn_ActionId: string;
  msdyn_TargetEntityId: string;
}

/**
 * msdyn_SyncActionExecutionStateFromAgent request message
 *
 * Web API Action: msdyn_SyncActionExecutionStateFromAgent
 */
export class msdyn_SyncActionExecutionStateFromAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SyncActionExecutionStateFromAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SyncActionExecutionStateFromAgentRequestParameters>;

  constructor(parameters: msdyn_SyncActionExecutionStateFromAgentRequestParameters) {
    super("msdyn_SyncActionExecutionStateFromAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncActionExecutionStateFromAgent`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_TargetEntityTypeName: this.Parameters.msdyn_TargetEntityTypeName,
      msdyn_ActionState: this.Parameters.msdyn_ActionState,
      msdyn_ActionId: this.Parameters.msdyn_ActionId,
      msdyn_TargetEntityId: this.Parameters.msdyn_TargetEntityId,
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

  parseResponse(_response: Response): Promise<msdyn_SyncActionExecutionStateFromAgentResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SyncActionExecutionStateFromAgentResponse());
  }
}

/**
 * msdyn_SyncActionExecutionStateFromAgent response message
 */
export class msdyn_SyncActionExecutionStateFromAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SyncActionExecutionStateFromAgent");
  }

  static fromResponse(_data?: unknown): msdyn_SyncActionExecutionStateFromAgentResponse {
    return new msdyn_SyncActionExecutionStateFromAgentResponse();
  }
}
