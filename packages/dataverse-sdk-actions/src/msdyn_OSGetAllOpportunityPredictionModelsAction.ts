import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSGetAllOpportunityPredictionModels action
 */
export interface msdyn_OSGetAllOpportunityPredictionModelsResponse {
  Predictions: string;
}

/**
 * msdyn_OSGetAllOpportunityPredictionModels action
 *
 * Unbound action
 */
export class msdyn_OSGetAllOpportunityPredictionModelsAction implements Executable<msdyn_OSGetAllOpportunityPredictionModelsResponse> {
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
    const data = await response.json();
    return data as msdyn_OSGetAllOpportunityPredictionModelsResponse;
  }
}
