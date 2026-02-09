import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AIBRealTimePredict action
 */
export interface msdyn_AIBRealTimePredictResponse {
  Suggestions: string;
}

/**
 * msdyn_AIBRealTimePredict action
 *
 * Unbound action
 */
export class msdyn_AIBRealTimePredictAction implements Executable<msdyn_AIBRealTimePredictResponse> {
  constructor(
    public readonly filters: string,
    public readonly suggestionFor: string,
    public readonly context: string,
    public readonly version: string,
    public readonly suggestionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIBRealTimePredict`;

    const body: Record<string, unknown> = {
      Filters: this.filters,
      SuggestionFor: this.suggestionFor,
      Context: this.context,
      Version: this.version,
      SuggestionType: this.suggestionType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AIBRealTimePredictResponse> {
    const data = await response.json();
    return data as msdyn_AIBRealTimePredictResponse;
  }
}
