import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSCreatePrediction action
 */
export interface msdyn_OSCreatePredictionResponse {
  // No content returned
}

/**
 * msdyn_OSCreatePrediction action
 *
 * Unbound action
 */
export class msdyn_OSCreatePredictionAction implements Executable<msdyn_OSCreatePredictionResponse> {
  constructor(public readonly modelState: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSCreatePrediction`;

    const body: Record<string, unknown> = {
      ModelState: this.modelState,
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

  async parseResponse(response: Response): Promise<msdyn_OSCreatePredictionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
