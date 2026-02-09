import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_LogEngageReadinessFlowRunState request message
 *
 * Web API Action: msdyn_SalesAgents_LogEngageReadinessFlowRunState
 */
export class msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse>
{
  constructor(
    public msdyn_TrackingId: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_Thread: string,
    public msdyn_FlowRunState: string
  ) {
    super("msdyn_SalesAgents_LogEngageReadinessFlowRunState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_LogEngageReadinessFlowRunState`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_Thread: this.msdyn_Thread,
      msdyn_FlowRunState: this.msdyn_FlowRunState,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_Thread: this.msdyn_Thread,
      msdyn_FlowRunState: this.msdyn_FlowRunState,
    };
  }
}

/**
 * msdyn_SalesAgents_LogEngageReadinessFlowRunState response message
 */
export class msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_LogEngageReadinessFlowRunState");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse {
    return new msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse();
  }
}
