import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAllLeadPredictionModels action
 */
export interface msdyn_GetAllLeadPredictionModelsResponse {
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAllLeadPredictionModelsResponse> {
    const data = await response.json();
    return data as msdyn_GetAllLeadPredictionModelsResponse;
  }
}
