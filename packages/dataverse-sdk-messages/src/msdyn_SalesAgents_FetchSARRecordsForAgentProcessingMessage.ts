import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchSARRecordsForAgentProcessing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_AgentType: number;
  msdyn_SalesAgentType: number;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchSARRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchSARRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters) {
    super("msdyn_SalesAgents_FetchSARRecordsForAgentProcessing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchSARRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_AgentType: this.Parameters.msdyn_AgentType,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_FetchSARRecordsForAgentProcessing action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResult {
  "@odata.context"?: string;
  msdyn_Records: string;
}

/**
 * msdyn_SalesAgents_FetchSARRecordsForAgentProcessing response message
 *
 * `result` is the value the msdyn_SalesAgents_FetchSARRecordsForAgentProcessing action returns (see {@link msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResult}).
 */
export class msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResult) {
    super("msdyn_SalesAgents_FetchSARRecordsForAgentProcessing");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse(
      data as msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResult
    );
  }
}
