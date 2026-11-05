import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_contactablefieldsaction action
 */
export interface msdynmkt_contactablefieldsactionResponse {
  msdynmkt_contactablefieldsresponse: string;
}

/**
 * msdynmkt_contactablefieldsaction action
 *
 * Unbound action
 */
export class msdynmkt_contactablefieldsactionAction implements Executable<msdynmkt_contactablefieldsactionResponse> {
  constructor(
    public readonly msdynmkt_contactpointtypes: string,
    public readonly msdynmkt_entitytypes: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_contactablefieldsaction`;

    const body: Record<string, unknown> = {
      msdynmkt_contactpointtypes: this.msdynmkt_contactpointtypes,
      msdynmkt_entitytypes: this.msdynmkt_entitytypes,
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

  async parseResponse(response: Response): Promise<msdynmkt_contactablefieldsactionResponse> {
    const data = await response.json();
    return data as msdynmkt_contactablefieldsactionResponse;
  }
}
