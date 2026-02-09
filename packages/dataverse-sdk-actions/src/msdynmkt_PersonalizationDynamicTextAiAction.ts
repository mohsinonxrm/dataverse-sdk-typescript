import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_PersonalizationDynamicTextAi action
 */
export interface msdynmkt_PersonalizationDynamicTextAiResponse {
  msdynmkt_PersonalizationDynamicTextAiResponse: string;
}

/**
 * msdynmkt_PersonalizationDynamicTextAi action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationDynamicTextAiAction implements Executable<msdynmkt_PersonalizationDynamicTextAiResponse> {
  constructor(public readonly msdynmkt_PersonalizationDynamicTextAiRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationDynamicTextAi`;

    const body: Record<string, unknown> = {
      msdynmkt_PersonalizationDynamicTextAiRequest:
        this.msdynmkt_PersonalizationDynamicTextAiRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationDynamicTextAiResponse> {
    const data = await response.json();
    return data as msdynmkt_PersonalizationDynamicTextAiResponse;
  }
}
