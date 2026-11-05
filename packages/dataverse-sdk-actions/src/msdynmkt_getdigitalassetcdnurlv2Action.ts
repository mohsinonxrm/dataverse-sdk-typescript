import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_getdigitalassetcdnurlv2 action
 */
export interface msdynmkt_getdigitalassetcdnurlv2Response {
  msdynmkt_filecdnurl: string;
}

/**
 * msdynmkt_getdigitalassetcdnurlv2 action
 *
 * Unbound action
 */
export class msdynmkt_getdigitalassetcdnurlv2Action implements Executable<msdynmkt_getdigitalassetcdnurlv2Response> {
  constructor(
    public readonly msdynmkt_filetype: string,
    public readonly msdynmkt_fileid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getdigitalassetcdnurlv2`;

    const body: Record<string, unknown> = {
      msdynmkt_filetype: this.msdynmkt_filetype,
      msdynmkt_fileid: this.msdynmkt_fileid,
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

  async parseResponse(response: Response): Promise<msdynmkt_getdigitalassetcdnurlv2Response> {
    const data = await response.json();
    return data as msdynmkt_getdigitalassetcdnurlv2Response;
  }
}
