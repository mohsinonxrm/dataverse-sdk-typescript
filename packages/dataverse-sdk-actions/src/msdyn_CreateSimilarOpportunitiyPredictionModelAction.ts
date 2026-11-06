import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateSimilarOpportunitiyPredictionModel action
 */
export interface msdyn_CreateSimilarOpportunitiyPredictionModelResponse {
  // No content returned
}

/**
 * msdyn_CreateSimilarOpportunitiyPredictionModel action
 *
 * Unbound action
 */
export class msdyn_CreateSimilarOpportunitiyPredictionModelAction implements Executable<msdyn_CreateSimilarOpportunitiyPredictionModelResponse> {
  constructor(public readonly modelState?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSimilarOpportunitiyPredictionModel`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CreateSimilarOpportunitiyPredictionModelResponse> {
    // No return value (204 No Content)
    return {};
  }
}
