import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AnalyzeSentiment request message
 *
 * Web API Action: AnalyzeSentiment
 */
export class AnalyzeSentimentRequest
  extends OrganizationRequest
  implements Executable<AnalyzeSentimentResponse>
{
  constructor(
    public text: string,
    public modelId: string,
    public language: string
  ) {
    super("AnalyzeSentiment");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AnalyzeSentiment`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
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

  async parseResponse(response: Response): Promise<AnalyzeSentimentResponse> {
    const data = await response.json();
    return AnalyzeSentimentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
    };
  }
}

/**
 * AnalyzeSentiment response message
 */
export class AnalyzeSentimentResponse extends OrganizationResponse {
  constructor(public result: AnalyzeSentimentResponse) {
    super("AnalyzeSentiment");
  }

  static fromResponse(data: unknown): AnalyzeSentimentResponse {
    return new AnalyzeSentimentResponse((data as any).value);
  }
}
