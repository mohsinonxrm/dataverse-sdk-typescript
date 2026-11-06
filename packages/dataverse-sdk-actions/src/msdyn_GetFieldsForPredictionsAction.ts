import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetFieldsForPredictions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFieldsForPredictionsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetFieldsForPredictionsResponse;
  }
}
