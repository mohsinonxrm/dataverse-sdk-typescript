import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetSalesAgentProcessingState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetSalesAgentProcessingStateRequestParameters {
  msdyn_SalesAgentType: number;
  msdyn_AgentProfileId?: string;
  msdyn_RecordId: string;
}

/**
 * msdyn_SalesAgents_GetSalesAgentProcessingState request message
 *
 * Web API Action: msdyn_SalesAgents_GetSalesAgentProcessingState
 */
export class msdyn_SalesAgents_GetSalesAgentProcessingStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetSalesAgentProcessingStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetSalesAgentProcessingStateRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetSalesAgentProcessingStateRequestParameters) {
    super("msdyn_SalesAgents_GetSalesAgentProcessingState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSalesAgentProcessingState`;

    const body = requestBody({
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
      msdyn_RecordId: this.Parameters.msdyn_RecordId,
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
  ): Promise<msdyn_SalesAgents_GetSalesAgentProcessingStateResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return msdyn_SalesAgents_GetSalesAgentProcessingStateResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_SalesAgents_GetSalesAgentProcessingStateResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetSalesAgentProcessingState action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_SalesAgents_GetSalesAgentProcessingStateResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_SalesAgents_GetSalesAgentProcessingState response message
 *
 * `result` is the value the msdyn_SalesAgents_GetSalesAgentProcessingState action returns (see {@link msdyn_SalesAgents_GetSalesAgentProcessingStateResult}).
 */
export class msdyn_SalesAgents_GetSalesAgentProcessingStateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSalesAgentProcessingStateResult) {
    super("msdyn_SalesAgents_GetSalesAgentProcessingState");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetSalesAgentProcessingStateResponse {
    return new msdyn_SalesAgents_GetSalesAgentProcessingStateResponse(
      (data ?? null) as msdyn_SalesAgents_GetSalesAgentProcessingStateResult
    );
  }
}
