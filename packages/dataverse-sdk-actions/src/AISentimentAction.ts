import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AISentiment action
 */
export interface AISentimentResponse {
  AnalyzedSentiment: string;
}

/**
 * Parameters of the AISentiment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISentimentActionParameters {
  Text: string;
}

/**
 * AISentiment action
 *
 * Unbound action
 */
export class AISentimentAction implements Executable<AISentimentResponse> {
  constructor(public readonly parameters: AISentimentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISentiment`;

    const body = requestBody({
      Text: this.parameters.Text,
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

  async parseResponse(response: Response): Promise<AISentimentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AISentimentResponse;
    return (await response.json()) as AISentimentResponse;
  }
}
