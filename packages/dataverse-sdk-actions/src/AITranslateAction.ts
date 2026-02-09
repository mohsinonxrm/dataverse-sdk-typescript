import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AITranslate action
 */
export interface AITranslateResponse {
  TranslatedText: string;
}

/**
 * AITranslate action
 *
 * Unbound action
 */
export class AITranslateAction implements Executable<AITranslateResponse> {
  constructor(
    public readonly targetLanguage: string,
    public readonly text: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AITranslate`;

    const body: Record<string, unknown> = {
      TargetLanguage: this.targetLanguage,
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

  async parseResponse(response: Response): Promise<AITranslateResponse> {
    const data = await response.json();
    return data as AITranslateResponse;
  }
}
