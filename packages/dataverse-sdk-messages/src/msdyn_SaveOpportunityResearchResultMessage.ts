import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SaveOpportunityResearchResultResponse as msdyn_SaveOpportunityResearchResultResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SaveOpportunityResearchResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveOpportunityResearchResultRequestParameters {
  OpportunityResearchResultPayload: string;
}

/**
 * msdyn_SaveOpportunityResearchResult request message
 *
 * Web API Action: msdyn_SaveOpportunityResearchResult
 */
export class msdyn_SaveOpportunityResearchResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveOpportunityResearchResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveOpportunityResearchResultRequestParameters>;

  constructor(parameters: msdyn_SaveOpportunityResearchResultRequestParameters) {
    super("msdyn_SaveOpportunityResearchResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchResult`;

    const body = requestBody({
      OpportunityResearchResultPayload: this.Parameters.OpportunityResearchResultPayload,
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

  async parseResponse(response: Response): Promise<msdyn_SaveOpportunityResearchResultResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SaveOpportunityResearchResultResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SaveOpportunityResearchResult response message
 */
export class msdyn_SaveOpportunityResearchResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveOpportunityResearchResultResponseData) {
    super("msdyn_SaveOpportunityResearchResult");
  }

  static fromResponse(data: unknown): msdyn_SaveOpportunityResearchResultResponse {
    return new msdyn_SaveOpportunityResearchResultResponse(
      responseObject<msdyn_SaveOpportunityResearchResultResponseData>(data)
    );
  }
}
