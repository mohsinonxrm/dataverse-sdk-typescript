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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OSGetAllOpportunityPredictionModelsResponse;
    return (await response.json()) as msdyn_OSGetAllOpportunityPredictionModelsResponse;
  }
}
