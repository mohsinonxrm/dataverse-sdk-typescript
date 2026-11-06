import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreatePrediction action
 */
export interface msdyn_CreatePredictionResponse {
  // No content returned
}

/**
 * msdyn_CreatePrediction action
 *
 * Unbound action
 */
export class msdyn_CreatePredictionAction implements Executable<msdyn_CreatePredictionResponse> {
  constructor(public readonly modelState?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreatePrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_CreatePredictionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
