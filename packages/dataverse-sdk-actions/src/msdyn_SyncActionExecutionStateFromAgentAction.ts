import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SyncActionExecutionStateFromAgent action
 */
export interface msdyn_SyncActionExecutionStateFromAgentResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SyncActionExecutionStateFromAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncActionExecutionStateFromAgentActionParameters {
  msdyn_TrackingId?: string;
  msdyn_TargetEntityTypeName: string;
  msdyn_ActionState: number;
  msdyn_ActionId: string;
  msdyn_TargetEntityId: string;
}

/**
 * msdyn_SyncActionExecutionStateFromAgent action
 *
 * Unbound action
 */
export class msdyn_SyncActionExecutionStateFromAgentAction implements Executable<msdyn_SyncActionExecutionStateFromAgentResponse> {
  constructor(
    public readonly parameters: msdyn_SyncActionExecutionStateFromAgentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncActionExecutionStateFromAgent`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_TargetEntityTypeName: this.parameters.msdyn_TargetEntityTypeName,
      msdyn_ActionState: this.parameters.msdyn_ActionState,
      msdyn_ActionId: this.parameters.msdyn_ActionId,
      msdyn_TargetEntityId: this.parameters.msdyn_TargetEntityId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SyncActionExecutionStateFromAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SyncActionExecutionStateFromAgentResponse;
    return (await response.json()) as msdyn_SyncActionExecutionStateFromAgentResponse;
  }
}
