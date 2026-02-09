import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AIExtract action
 */
export interface AIExtractResponse {
  ExtractedData: string[];
}

/**
 * AIExtract action
 *
 * Unbound action
 */
export class AIExtractAction implements Executable<AIExtractResponse> {
  constructor(
    public readonly text: string,
    public readonly entity: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIExtract`;

    const body: Record<string, unknown> = {
      Text: this.text,
      Entity: this.entity,
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

  async parseResponse(response: Response): Promise<AIExtractResponse> {
    const data = await response.json();
    return data as AIExtractResponse;
  }
}
