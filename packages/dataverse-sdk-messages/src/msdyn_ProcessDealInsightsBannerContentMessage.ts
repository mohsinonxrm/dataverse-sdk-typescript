import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ProcessDealInsightsBannerContentResponse as msdyn_ProcessDealInsightsBannerContentResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ProcessDealInsightsBannerContentResponse.fromResponse({});
    return msdyn_ProcessDealInsightsBannerContentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ProcessDealInsightsBannerContent response message
 */
export class msdyn_ProcessDealInsightsBannerContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessDealInsightsBannerContentResponseData) {
    super("msdyn_ProcessDealInsightsBannerContent");
  }

  static fromResponse(data: unknown): msdyn_ProcessDealInsightsBannerContentResponse {
    return new msdyn_ProcessDealInsightsBannerContentResponse(
      responseObject<msdyn_ProcessDealInsightsBannerContentResponseData>(data)
    );
  }
}
