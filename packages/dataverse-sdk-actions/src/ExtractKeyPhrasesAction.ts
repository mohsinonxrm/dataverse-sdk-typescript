import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExtractKeyPhrases action
 */
export interface ExtractKeyPhrasesResponse {
  countOfPhrases: number;
}

/**
 * ExtractKeyPhrases action
 *
 * Unbound action
 */
export class ExtractKeyPhrasesAction implements Executable<ExtractKeyPhrasesResponse> {
  constructor(
    public readonly text: string,
    public readonly modelId?: string,
    public readonly language?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractKeyPhrases`;

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

  async parseResponse(response: Response): Promise<ExtractKeyPhrasesResponse> {
    const data = await response.json();
    return data as ExtractKeyPhrasesResponse;
  }
}
