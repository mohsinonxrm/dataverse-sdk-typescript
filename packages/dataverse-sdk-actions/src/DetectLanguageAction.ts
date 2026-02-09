import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DetectLanguage action
 */
export interface DetectLanguageResponse {
  language: string;
  score: number;
}

/**
 * DetectLanguage action
 *
 * Unbound action
 */
export class DetectLanguageAction implements Executable<DetectLanguageResponse> {
  constructor(
    public readonly text: string,
    public readonly modelId: string,
    public readonly countryHint: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DetectLanguage`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      countryHint: this.countryHint,
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

  async parseResponse(response: Response): Promise<DetectLanguageResponse> {
    const data = await response.json();
    return data as DetectLanguageResponse;
  }
}
