import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AISentiment action
 */
export interface AISentimentResponse {
  AnalyzedSentiment: string;
}

/**
 * AISentiment action
 *
 * Unbound action
 */
export class AISentimentAction implements Executable<AISentimentResponse> {
  constructor(public readonly text: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISentiment`;

    const body: Record<string, unknown> = {
      Text: this.text,
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

  async parseResponse(response: Response): Promise<AISentimentResponse> {
    const data = await response.json();
    return data as AISentimentResponse;
  }
}
