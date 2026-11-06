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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAllLeadPredictionModelsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAllLeadPredictionModelsResponse;
    return (await response.json()) as msdyn_GetAllLeadPredictionModelsResponse;
  }
}
