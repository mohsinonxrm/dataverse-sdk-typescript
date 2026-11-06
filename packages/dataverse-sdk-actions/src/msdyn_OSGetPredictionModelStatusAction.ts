import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSGetPredictionModelStatus action
 */
export interface msdyn_OSGetPredictionModelStatusResponse {
  PredictionModelStatus: string;
}

/**
 * msdyn_OSGetPredictionModelStatus action
 *
 * Unbound action
 */
export class msdyn_OSGetPredictionModelStatusAction implements Executable<msdyn_OSGetPredictionModelStatusResponse> {
  constructor(public readonly predictionName?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetPredictionModelStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetPredictionModelStatusResponse> {
    const data = await response.json();
    return data as msdyn_OSGetPredictionModelStatusResponse;
  }
}
