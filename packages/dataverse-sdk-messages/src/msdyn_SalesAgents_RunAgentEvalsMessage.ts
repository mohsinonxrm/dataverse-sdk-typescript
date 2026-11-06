import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_RunAgentEvalsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_RunAgentEvals action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_RunAgentEvalsResult {
  "@odata.context"?: string;
  msdyn_Success: boolean;
}

/**
 * msdyn_SalesAgents_RunAgentEvals response message
 *
 * `result` is the value the msdyn_SalesAgents_RunAgentEvals action returns (see {@link msdyn_SalesAgents_RunAgentEvalsResult}).
 */
export class msdyn_SalesAgents_RunAgentEvalsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_RunAgentEvalsResult) {
    super("msdyn_SalesAgents_RunAgentEvals");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_RunAgentEvalsResponse {
    return new msdyn_SalesAgents_RunAgentEvalsResponse(
      data as msdyn_SalesAgents_RunAgentEvalsResult
    );
  }
}
