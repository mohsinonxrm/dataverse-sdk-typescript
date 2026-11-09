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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_OSGetAllOpportunityPredictionModelsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OSGetAllOpportunityPredictionModelsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OSGetAllOpportunityPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSGetAllOpportunityPredictionModelsResult {
  "@odata.context"?: string;
  Predictions: string;
}

/**
 * msdyn_OSGetAllOpportunityPredictionModels response message
 *
 * `result` is the value the msdyn_OSGetAllOpportunityPredictionModels action returns (see {@link msdyn_OSGetAllOpportunityPredictionModelsResult}).
 */
export class msdyn_OSGetAllOpportunityPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetAllOpportunityPredictionModelsResult) {
    super("msdyn_OSGetAllOpportunityPredictionModels");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OSGetAllOpportunityPredictionModelsResponse {
    return new msdyn_OSGetAllOpportunityPredictionModelsResponse(
      data as msdyn_OSGetAllOpportunityPredictionModelsResult
    );
  }
}
