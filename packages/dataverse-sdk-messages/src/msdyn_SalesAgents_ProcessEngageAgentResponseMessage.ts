import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ProcessEngageAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters {
  msdyn_SalesAgentRun?: string;
  msdyn_Thread?: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_EngageAgentActivities: string;
}

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessEngageAgentResponse
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessEngageAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters) {
    super("msdyn_SalesAgents_ProcessEngageAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessEngageAgentResponse`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_Thread: this.Parameters.msdyn_Thread,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_EngageAgentActivities: this.Parameters.msdyn_EngageAgentActivities,
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
  ): Promise<msdyn_SalesAgents_ProcessEngageAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ProcessEngageAgentResponseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_ProcessEngageAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ProcessEngageAgentResponseResult {
  "@odata.context"?: string;
  msdyn_AreAllFollowUpsCompleted: boolean;
  msdyn_EmailBody: string;
  msdyn_Explanation: string;
  msdyn_IsAwaitingResponse: boolean;
  msdyn_IsStuck: boolean;
  msdyn_IsUnsubscribe: boolean;
}

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse response message
 *
 * `result` is the value the msdyn_SalesAgents_ProcessEngageAgentResponse action returns (see {@link msdyn_SalesAgents_ProcessEngageAgentResponseResult}).
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessEngageAgentResponseResult) {
    super("msdyn_SalesAgents_ProcessEngageAgentResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ProcessEngageAgentResponseResponse {
    return new msdyn_SalesAgents_ProcessEngageAgentResponseResponse(
      data as msdyn_SalesAgents_ProcessEngageAgentResponseResult
    );
  }
}
