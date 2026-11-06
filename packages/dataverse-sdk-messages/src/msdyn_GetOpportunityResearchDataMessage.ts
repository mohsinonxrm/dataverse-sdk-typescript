import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetOpportunityResearchDataResponse as msdyn_GetOpportunityResearchDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetOpportunityResearchData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityResearchDataRequestParameters {
  RequestedFields: string;
  AdditionalContext?: string;
  OpportunityId: string;
  IncludeStatusMetadata?: boolean;
  MacroAgentOrchestrationId: string;
  SalesAgentRunId?: string;
}

/**
 * msdyn_GetOpportunityResearchData request message
 *
 * Web API Action: msdyn_GetOpportunityResearchData
 */
export class msdyn_GetOpportunityResearchDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityResearchDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityResearchDataRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityResearchDataRequestParameters) {
    super("msdyn_GetOpportunityResearchData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchData`;

    const body = requestBody({
      RequestedFields: this.Parameters.RequestedFields,
      AdditionalContext: this.Parameters.AdditionalContext,
      OpportunityId: this.Parameters.OpportunityId,
      IncludeStatusMetadata: this.Parameters.IncludeStatusMetadata,
      MacroAgentOrchestrationId: this.Parameters.MacroAgentOrchestrationId,
      SalesAgentRunId: this.Parameters.SalesAgentRunId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetOpportunityResearchDataResponse.fromResponse({});
    return msdyn_GetOpportunityResearchDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetOpportunityResearchData response message
 */
export class msdyn_GetOpportunityResearchDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityResearchDataResponseData) {
    super("msdyn_GetOpportunityResearchData");
  }

  static fromResponse(data: unknown): msdyn_GetOpportunityResearchDataResponse {
    return new msdyn_GetOpportunityResearchDataResponse(
      responseObject<msdyn_GetOpportunityResearchDataResponseData>(data)
    );
  }
}
