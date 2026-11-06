import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ProcessDealInsightsBannerContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessDealInsightsBannerContentRequestParameters {
  SalesAgentRunId: string;
  MacroAgentOrchestrationId: string;
  OpportunityId: string;
  RawMCSAgentResponse: string;
  AgentProfileId?: string;
}

/**
 * msdyn_ProcessDealInsightsBannerContent request message
 *
 * Web API Action: msdyn_ProcessDealInsightsBannerContent
 */
export class msdyn_ProcessDealInsightsBannerContentRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProcessDealInsightsBannerContentResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProcessDealInsightsBannerContentRequestParameters>;

  constructor(parameters: msdyn_ProcessDealInsightsBannerContentRequestParameters) {
    super("msdyn_ProcessDealInsightsBannerContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessDealInsightsBannerContent`;

    const body = requestBody({
      SalesAgentRunId: this.Parameters.SalesAgentRunId,
      MacroAgentOrchestrationId: this.Parameters.MacroAgentOrchestrationId,
      OpportunityId: this.Parameters.OpportunityId,
      RawMCSAgentResponse: this.Parameters.RawMCSAgentResponse,
      AgentProfileId: this.Parameters.AgentProfileId,
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

  async parseResponse(response: Response): Promise<msdyn_ProcessDealInsightsBannerContentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ProcessDealInsightsBannerContentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProcessDealInsightsBannerContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessDealInsightsBannerContentResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  ProcessedAgentResponse: string;
}

/**
 * msdyn_ProcessDealInsightsBannerContent response message
 *
 * `result` is the value the msdyn_ProcessDealInsightsBannerContent action returns (see {@link msdyn_ProcessDealInsightsBannerContentResult}).
 */
export class msdyn_ProcessDealInsightsBannerContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessDealInsightsBannerContentResult) {
    super("msdyn_ProcessDealInsightsBannerContent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProcessDealInsightsBannerContentResponse {
    return new msdyn_ProcessDealInsightsBannerContentResponse(
      data as msdyn_ProcessDealInsightsBannerContentResult
    );
  }
}
