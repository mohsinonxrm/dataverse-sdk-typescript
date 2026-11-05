import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_getdigitalassetcdnurlv2Response as msdynmkt_getdigitalassetcdnurlv2ResponseData } from "./types/index.js";

/**
 * msdynmkt_getdigitalassetcdnurlv2 request message
 *
 * Web API Action: msdynmkt_getdigitalassetcdnurlv2
 */
export class msdynmkt_getdigitalassetcdnurlv2Request
  extends OrganizationRequest
  implements Executable<msdynmkt_getdigitalassetcdnurlv2Response>
{
  constructor(
    public msdynmkt_filetype: string,
    public msdynmkt_fileid: string
  ) {
    super("msdynmkt_getdigitalassetcdnurlv2");
  }

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
    return msdynmkt_getdigitalassetcdnurlv2Response.fromResponse(data);
  }
}

/**
 * msdynmkt_getdigitalassetcdnurlv2 response message
 */
export class msdynmkt_getdigitalassetcdnurlv2Response extends OrganizationResponse {
  constructor(public result: msdynmkt_getdigitalassetcdnurlv2ResponseData) {
    super("msdynmkt_getdigitalassetcdnurlv2");
  }

  static fromResponse(data: unknown): msdynmkt_getdigitalassetcdnurlv2Response {
    return new msdynmkt_getdigitalassetcdnurlv2Response(
      responseObject<msdynmkt_getdigitalassetcdnurlv2ResponseData>(data)
    );
  }
}
