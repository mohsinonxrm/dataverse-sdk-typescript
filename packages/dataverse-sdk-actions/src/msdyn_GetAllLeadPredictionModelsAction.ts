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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetAllLeadPredictionModelsResponse;
  }
}
