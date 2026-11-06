import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_RunAgentEvalsResponse as msdyn_SalesAgents_RunAgentEvalsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_RunAgentEvals message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_RunAgentEvalsRequestParameters {
  msdyn_MicroAgent: string;
  msdyn_OrchestrationId: string;
  msdyn_SalesAgent: string;
  msdyn_RecordId: string;
  msdyn_AgentInput: string;
  msdyn_AgentOutput: string;
}

/**
 * msdyn_SalesAgents_RunAgentEvals request message
 *
 * Web API Action: msdyn_SalesAgents_RunAgentEvals
 */
export class msdyn_SalesAgents_RunAgentEvalsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_RunAgentEvalsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_RunAgentEvalsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_RunAgentEvalsRequestParameters) {
    super("msdyn_SalesAgents_RunAgentEvals", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_RunAgentEvals`;

    const body = requestBody({
      msdyn_MicroAgent: this.Parameters.msdyn_MicroAgent,
      msdyn_OrchestrationId: this.Parameters.msdyn_OrchestrationId,
      msdyn_SalesAgent: this.Parameters.msdyn_SalesAgent,
      msdyn_RecordId: this.Parameters.msdyn_RecordId,
      msdyn_AgentInput: this.Parameters.msdyn_AgentInput,
      msdyn_AgentOutput: this.Parameters.msdyn_AgentOutput,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_RunAgentEvalsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesAgents_RunAgentEvalsResponse.fromResponse({});
    return msdyn_SalesAgents_RunAgentEvalsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_RunAgentEvals response message
 */
export class msdyn_SalesAgents_RunAgentEvalsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_RunAgentEvalsResponseData) {
    super("msdyn_SalesAgents_RunAgentEvals");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_RunAgentEvalsResponse {
    return new msdyn_SalesAgents_RunAgentEvalsResponse(
      responseObject<msdyn_SalesAgents_RunAgentEvalsResponseData>(data)
    );
  }
}
