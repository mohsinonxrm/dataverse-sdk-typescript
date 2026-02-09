import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_OSGetAllOpportunityPredictionModelsResponse> {
    const data = await response.json();
    return msdyn_OSGetAllOpportunityPredictionModelsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OSGetAllOpportunityPredictionModels response message
 */
export class msdyn_OSGetAllOpportunityPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetAllOpportunityPredictionModelsResponse) {
    super("msdyn_OSGetAllOpportunityPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_OSGetAllOpportunityPredictionModelsResponse {
    return new msdyn_OSGetAllOpportunityPredictionModelsResponse((data as any).value);
  }
}
