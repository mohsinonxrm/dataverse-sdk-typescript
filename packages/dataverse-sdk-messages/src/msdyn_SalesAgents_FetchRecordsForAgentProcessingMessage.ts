import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchRecordsForAgentProcessing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters {
  msdyn_AgentProfileId?: string;
  msdyn_NextLink?: string;
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters) {
    super("msdyn_SalesAgents_FetchRecordsForAgentProcessing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
      msdyn_NextLink: this.Parameters.msdyn_NextLink,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_Top: this.Parameters.msdyn_Top,
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
  ): Promise<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_FetchRecordsForAgentProcessing action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_FetchRecordsForAgentProcessingResult {
  "@odata.context"?: string;
  msdyn_ODataNextLink: string;
  msdyn_Records: string;
}

/**
 * msdyn_SalesAgents_FetchRecordsForAgentProcessing response message
 *
 * `result` is the value the msdyn_SalesAgents_FetchRecordsForAgentProcessing action returns (see {@link msdyn_SalesAgents_FetchRecordsForAgentProcessingResult}).
 */
export class msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchRecordsForAgentProcessingResult) {
    super("msdyn_SalesAgents_FetchRecordsForAgentProcessing");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse(
      data as msdyn_SalesAgents_FetchRecordsForAgentProcessingResult
    );
  }
}
