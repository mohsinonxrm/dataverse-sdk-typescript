import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AnalyzeSentiment action
 */
export interface AnalyzeSentimentResponse {
  sentiment: string;
}

/**
 * AnalyzeSentiment action
 *
 * Unbound action
 */
export class AnalyzeSentimentAction implements Executable<AnalyzeSentimentResponse> {
  constructor(
    public readonly text: string,
    public readonly modelId: string,
    public readonly language: string
  ) {}

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
    return data as AnalyzeSentimentResponse;
  }
}
