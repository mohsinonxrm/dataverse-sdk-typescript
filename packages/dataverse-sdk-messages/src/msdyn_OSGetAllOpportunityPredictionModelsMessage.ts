import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OSGetAllOpportunityPredictionModelsResponse as msdyn_OSGetAllOpportunityPredictionModelsResponseData } from "./types/index.js";

/**
 * msdyn_OSGetAllOpportunityPredictionModels request message
 *
 * Web API Action: msdyn_OSGetAllOpportunityPredictionModels
 */
export class msdyn_OSGetAllOpportunityPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSGetAllOpportunityPredictionModelsResponse>
{
  constructor() {
    super("msdyn_OSGetAllOpportunityPredictionModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetAllOpportunityPredictionModels`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_OSGetAllOpportunityPredictionModelsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OSGetAllOpportunityPredictionModelsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_OSGetAllOpportunityPredictionModels response message
 */
export class msdyn_OSGetAllOpportunityPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetAllOpportunityPredictionModelsResponseData) {
    super("msdyn_OSGetAllOpportunityPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_OSGetAllOpportunityPredictionModelsResponse {
    return new msdyn_OSGetAllOpportunityPredictionModelsResponse(
      responseObject<msdyn_OSGetAllOpportunityPredictionModelsResponseData>(data)
    );
  }
}
