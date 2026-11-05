import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CategorizeText action
 */
export interface CategorizeTextResponse {
  originalText: string;
}

/**
 * CategorizeText action
 *
 * Unbound action
 */
export class CategorizeTextAction implements Executable<CategorizeTextResponse> {
  constructor(
    public readonly text: string,
    public readonly modelId: string,
    public readonly language: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CategorizeText`;

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

  async parseResponse(response: Response): Promise<CategorizeTextResponse> {
    const data = await response.json();
    return data as CategorizeTextResponse;
  }
}
