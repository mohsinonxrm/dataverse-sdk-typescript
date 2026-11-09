import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AnalyzeSentiment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AnalyzeSentimentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AnalyzeSentimentResponse;
  }
}
