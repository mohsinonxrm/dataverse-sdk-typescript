import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AISummarize action
 */
export interface AISummarizeResponse {
  SummarizedText: string;
}

/**
 * AISummarize action
 *
 * Unbound action
 */
export class AISummarizeAction implements Executable<AISummarizeResponse> {
  constructor(public readonly text: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarize`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<AISummarizeResponse> {
    const data = await response.json();
    return data as AISummarizeResponse;
  }
}
