import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_LogEngageReadinessFlowRunState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequestParameters {
  msdyn_Thread?: string;
  msdyn_SalesAgentRun?: string;
  msdyn_FlowRunState?: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_LogEngageReadinessFlowRunState request message
 *
 * Web API Action: msdyn_SalesAgents_LogEngageReadinessFlowRunState
 */
export class msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequestParameters = {}) {
    super("msdyn_SalesAgents_LogEngageReadinessFlowRunState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_LogEngageReadinessFlowRunState`;

    const body = requestBody({
      msdyn_Thread: this.Parameters.msdyn_Thread,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_FlowRunState: this.Parameters.msdyn_FlowRunState,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse();
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
