import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetOpportunityResearchResultResponse as msdyn_GetOpportunityResearchResultResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetOpportunityResearchResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityResearchResultRequestParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetOpportunityResearchResult request message
 *
 * Web API Action: msdyn_GetOpportunityResearchResult
 */
export class msdyn_GetOpportunityResearchResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityResearchResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityResearchResultRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityResearchResultRequestParameters) {
    super("msdyn_GetOpportunityResearchResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchResult`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetOpportunityResearchResultResponse.fromResponse({});
    return msdyn_GetOpportunityResearchResultResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetOpportunityResearchResult response message
 */
export class msdyn_GetOpportunityResearchResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityResearchResultResponseData) {
    super("msdyn_GetOpportunityResearchResult");
  }

  static fromResponse(data: unknown): msdyn_GetOpportunityResearchResultResponse {
    return new msdyn_GetOpportunityResearchResultResponse(
      responseObject<msdyn_GetOpportunityResearchResultResponseData>(data)
    );
  }
}
