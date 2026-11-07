import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OSGetAllOpportunityPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSGetAllOpportunityPredictionModelsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OSGetAllOpportunityPredictionModelsResponse;
  }
}
