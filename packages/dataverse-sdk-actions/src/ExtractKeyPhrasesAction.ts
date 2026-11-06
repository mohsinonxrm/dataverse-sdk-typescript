import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ExtractKeyPhrases action
 */
export interface ExtractKeyPhrasesResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ExtractKeyPhrasesResponse;
    return (await response.json()) as ExtractKeyPhrasesResponse;
  }
}
