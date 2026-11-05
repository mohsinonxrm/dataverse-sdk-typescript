import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AIClassify action
 */
export interface AIClassifyResponse {
  Classification: string;
}

/**
 * AIClassify action
 *
 * Unbound action
 */
export class AIClassifyAction implements Executable<AIClassifyResponse> {
  constructor(
    public readonly categories: string[],
    public readonly text: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIClassify`;

    const body: Record<string, unknown> = {
      Categories: this.categories,
      Text: this.text,
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

  async parseResponse(response: Response): Promise<AIClassifyResponse> {
    const data = await response.json();
    return data as AIClassifyResponse;
  }
}
