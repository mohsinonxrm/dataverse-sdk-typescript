import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchOutreachEmailForAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters {
  msdyn_OutreachConfig?: string;
  msdyn_RegardingEntityId: string;
  msdyn_RegardingEntityName: string;
  msdyn_SalesAgentRunId?: string;
  msdyn_TrackingId?: string;
  msdyn_AgentProfileId?: string;
}

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent request message
 *
 * Web API Action: msdyn_SalesAgents_FetchOutreachEmailForAgent
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters) {
    super("msdyn_SalesAgents_FetchOutreachEmailForAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchOutreachEmailForAgent`;

    const body = requestBody({
      msdyn_OutreachConfig: this.Parameters.msdyn_OutreachConfig,
      msdyn_RegardingEntityId: this.Parameters.msdyn_RegardingEntityId,
      msdyn_RegardingEntityName: this.Parameters.msdyn_RegardingEntityName,
      msdyn_SalesAgentRunId: this.Parameters.msdyn_SalesAgentRunId,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
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
  ): Promise<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_FetchOutreachEmailForAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_FetchOutreachEmailForAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentResult {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent response message
 *
 * `result` is the value the msdyn_SalesAgents_FetchOutreachEmailForAgent action returns (see {@link msdyn_SalesAgents_FetchOutreachEmailForAgentResult}).
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchOutreachEmailForAgentResult) {
    super("msdyn_SalesAgents_FetchOutreachEmailForAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_FetchOutreachEmailForAgentResponse {
    return new msdyn_SalesAgents_FetchOutreachEmailForAgentResponse(
      data as msdyn_SalesAgents_FetchOutreachEmailForAgentResult
    );
  }
}
