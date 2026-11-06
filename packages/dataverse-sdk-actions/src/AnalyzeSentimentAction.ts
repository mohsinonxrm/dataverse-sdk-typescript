import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AnalyzeSentiment action
 */
export interface AnalyzeSentimentResponse {
  sentiment: string;
}

/**
 * Parameters of the AnalyzeSentiment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AnalyzeSentimentActionParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * AnalyzeSentiment action
 *
 * Unbound action
 */
export class AnalyzeSentimentAction implements Executable<AnalyzeSentimentResponse> {
  constructor(public readonly parameters: AnalyzeSentimentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AnalyzeSentiment`;

    const body = requestBody({
      text: this.parameters.text,
      modelId: this.parameters.modelId,
      language: this.parameters.language,
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

  async parseResponse(response: Response): Promise<AnalyzeSentimentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AnalyzeSentimentResponse;
  }
}
