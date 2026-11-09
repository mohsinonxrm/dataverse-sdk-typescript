import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ShouldRunAgentOrchestration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ShouldRunAgentOrchestrationRequestParameters {
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_AgentProfileId?: string;
}

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration request message
 *
 * Web API Action: msdyn_SalesAgents_ShouldRunAgentOrchestration
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ShouldRunAgentOrchestrationRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ShouldRunAgentOrchestrationRequestParameters) {
    super("msdyn_SalesAgents_ShouldRunAgentOrchestration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ShouldRunAgentOrchestration`;

    const body = requestBody({
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_ShouldRunAgentOrchestration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ShouldRunAgentOrchestrationResult {
  "@odata.context"?: string;
  msdyn_ShouldRun: boolean;
}

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration response message
 *
 * `result` is the value the msdyn_SalesAgents_ShouldRunAgentOrchestration action returns (see {@link msdyn_SalesAgents_ShouldRunAgentOrchestrationResult}).
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ShouldRunAgentOrchestrationResult) {
    super("msdyn_SalesAgents_ShouldRunAgentOrchestration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse {
    return new msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse(
      data as msdyn_SalesAgents_ShouldRunAgentOrchestrationResult
    );
  }
}
