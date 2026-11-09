import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetAllLeadPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAllLeadPredictionModelsResponse {
  "@odata.context"?: string;
  Predictions: string;
}

/**
 * msdyn_GetAllLeadPredictionModels action
 *
 * Unbound action
 */
export class msdyn_GetAllLeadPredictionModelsAction implements Executable<msdyn_GetAllLeadPredictionModelsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllLeadPredictionModels`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAllLeadPredictionModelsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAllLeadPredictionModelsResponse;
  }
}
