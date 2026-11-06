import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RecognizeText action
 */
export interface RecognizeTextResponse {
  countOfPages: number;
}

/**
 * RecognizeText action
 *
 * Unbound action
 */
export class RecognizeTextAction implements Executable<RecognizeTextResponse> {
  constructor(
    public readonly modelId: string | undefined,
    public readonly base64encoded: string,
    public readonly source?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RecognizeText`;

    const body: Record<string, unknown> = {
      modelId: this.modelId,
      base64encoded: this.base64encoded,
      source: this.source,
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

  async parseResponse(response: Response): Promise<RecognizeTextResponse> {
    const data = await response.json();
    return data as RecognizeTextResponse;
  }
}
