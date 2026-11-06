import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AIBRealTimePredict action
 */
export interface msdyn_AIBRealTimePredictResponse {
  Suggestions: string;
}

/**
 * Parameters of the msdyn_AIBRealTimePredict action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIBRealTimePredictActionParameters {
  SuggestionType: string;
  Filters: string;
  Context: string;
  SuggestionFor: string;
  Version: string;
}

/**
 * msdyn_AIBRealTimePredict action
 *
 * Unbound action
 */
export class msdyn_AIBRealTimePredictAction implements Executable<msdyn_AIBRealTimePredictResponse> {
  constructor(public readonly parameters: msdyn_AIBRealTimePredictActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIBRealTimePredict`;

    const body = requestBody({
      SuggestionType: this.parameters.SuggestionType,
      Filters: this.parameters.Filters,
      Context: this.parameters.Context,
      SuggestionFor: this.parameters.SuggestionFor,
      Version: this.parameters.Version,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AIBRealTimePredictResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AIBRealTimePredictResponse;
    return (await response.json()) as msdyn_AIBRealTimePredictResponse;
  }
}
