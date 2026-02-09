import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_ChannelContentPersonalize action
 */
export interface msdynmkt_ChannelContentPersonalizeResponse {
  msdynmkt_PersonalizeContentResponse: string;
}

/**
 * msdynmkt_ChannelContentPersonalize action
 *
 * Unbound action
 */
export class msdynmkt_ChannelContentPersonalizeAction implements Executable<msdynmkt_ChannelContentPersonalizeResponse> {
  constructor(public readonly msdynmkt_PersonalizeContentRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChannelContentPersonalize`;

    const body: Record<string, unknown> = {
      msdynmkt_PersonalizeContentRequest: this.msdynmkt_PersonalizeContentRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ChannelContentPersonalizeResponse> {
    const data = await response.json();
    return data as msdynmkt_ChannelContentPersonalizeResponse;
  }
}
