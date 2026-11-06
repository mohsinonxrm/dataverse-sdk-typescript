import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_IsOrchestrationComplete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_AgentType: number;
  msdyn_SalesAgentType: number;
  msdyn_MacroAgentOrchestrationId?: string;
}

/**
 * msdyn_SalesAgents_IsOrchestrationComplete request message
 *
 * Web API Action: msdyn_SalesAgents_IsOrchestrationComplete
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_IsOrchestrationCompleteResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters) {
    super("msdyn_SalesAgents_IsOrchestrationComplete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOrchestrationComplete`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_AgentType: this.Parameters.msdyn_AgentType,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_MacroAgentOrchestrationId: this.Parameters.msdyn_MacroAgentOrchestrationId,
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
  ): Promise<msdyn_SalesAgents_IsOrchestrationCompleteResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_IsOrchestrationCompleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_IsOrchestrationComplete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_IsOrchestrationCompleteResult {
  "@odata.context"?: string;
  msdyn_IsOrchestrationComplete: boolean;
}

/**
 * msdyn_SalesAgents_IsOrchestrationComplete response message
 *
 * `result` is the value the msdyn_SalesAgents_IsOrchestrationComplete action returns (see {@link msdyn_SalesAgents_IsOrchestrationCompleteResult}).
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsOrchestrationCompleteResult) {
    super("msdyn_SalesAgents_IsOrchestrationComplete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_IsOrchestrationCompleteResponse {
    return new msdyn_SalesAgents_IsOrchestrationCompleteResponse(
      data as msdyn_SalesAgents_IsOrchestrationCompleteResult
    );
  }
}
