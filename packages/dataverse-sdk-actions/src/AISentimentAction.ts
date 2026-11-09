import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AISentiment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AISentimentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AISentimentResponse;
  }
}
