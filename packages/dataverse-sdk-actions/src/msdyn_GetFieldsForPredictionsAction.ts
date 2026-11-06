import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFieldsForPredictions action
 */
export interface msdyn_GetFieldsForPredictionsResponse {
  FieldsForPrediction: string;
  SettingsConfiguration: string;
}

/**
 * msdyn_GetFieldsForPredictions action
 *
 * Unbound action
 */
export class msdyn_GetFieldsForPredictionsAction implements Executable<msdyn_GetFieldsForPredictionsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFieldsForPredictions`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetFieldsForPredictionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetFieldsForPredictionsResponse;
    return (await response.json()) as msdyn_GetFieldsForPredictionsResponse;
  }
}
