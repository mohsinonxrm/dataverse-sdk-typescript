import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetPredictionModelStatus action
 */
export interface msdyn_GetPredictionModelStatusResponse {
  PredictionModelStatus: string;
}

/**
 * msdyn_GetPredictionModelStatus action
 *
 * Unbound action
 */
export class msdyn_GetPredictionModelStatusAction implements Executable<msdyn_GetPredictionModelStatusResponse> {
  constructor(public readonly predictionName?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPredictionModelStatus`;

    const body: Record<string, unknown> = {
      PredictionName: this.predictionName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetPredictionModelStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetPredictionModelStatusResponse;
  }
}
