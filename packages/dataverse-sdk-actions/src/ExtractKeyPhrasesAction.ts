import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ExtractKeyPhrases action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExtractKeyPhrasesResponse {
  "@odata.context"?: string;
  countOfPhrases: number;
}

/**
 * Parameters of the ExtractKeyPhrases action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExtractKeyPhrasesActionParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * ExtractKeyPhrases action
 *
 * Unbound action
 */
export class ExtractKeyPhrasesAction implements Executable<ExtractKeyPhrasesResponse> {
  constructor(public readonly parameters: ExtractKeyPhrasesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractKeyPhrases`;

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

  async parseResponse(response: Response): Promise<ExtractKeyPhrasesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ExtractKeyPhrasesResponse;
  }
}
