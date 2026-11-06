import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_getdigitalassetcdnurlv2 action
 */
export interface msdynmkt_getdigitalassetcdnurlv2Response {
  msdynmkt_filecdnurl: string;
}

/**
 * Parameters of the msdynmkt_getdigitalassetcdnurlv2 action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getdigitalassetcdnurlv2ActionParameters {
  msdynmkt_fileid: string;
  msdynmkt_filetype: string;
}

/**
 * msdynmkt_getdigitalassetcdnurlv2 action
 *
 * Unbound action
 */
export class msdynmkt_getdigitalassetcdnurlv2Action implements Executable<msdynmkt_getdigitalassetcdnurlv2Response> {
  constructor(public readonly parameters: msdynmkt_getdigitalassetcdnurlv2ActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getdigitalassetcdnurlv2`;

    const body = requestBody({
      msdynmkt_fileid: this.parameters.msdynmkt_fileid,
      msdynmkt_filetype: this.parameters.msdynmkt_filetype,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_getdigitalassetcdnurlv2Response;
    return (await response.json()) as msdynmkt_getdigitalassetcdnurlv2Response;
  }
}
