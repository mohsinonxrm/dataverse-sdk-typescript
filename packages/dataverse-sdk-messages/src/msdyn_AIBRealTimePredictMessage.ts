import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AIBRealTimePredict request message
 *
 * Web API Action: msdyn_AIBRealTimePredict
 */
export class msdyn_AIBRealTimePredictRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIBRealTimePredictResponse>
{
  constructor(
    public filters: string,
    public suggestionFor: string,
    public context: string,
    public version: string,
    public suggestionType: string
  ) {
    super("msdyn_AIBRealTimePredict");
  }

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
    return msdyn_AIBRealTimePredictResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Filters: this.filters,
      SuggestionFor: this.suggestionFor,
      Context: this.context,
      Version: this.version,
      SuggestionType: this.suggestionType,
    };
  }
}

/**
 * msdyn_AIBRealTimePredict response message
 */
export class msdyn_AIBRealTimePredictResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIBRealTimePredictResponse) {
    super("msdyn_AIBRealTimePredict");
  }

  static fromResponse(data: unknown): msdyn_AIBRealTimePredictResponse {
    return new msdyn_AIBRealTimePredictResponse((data as any).value);
  }
}
