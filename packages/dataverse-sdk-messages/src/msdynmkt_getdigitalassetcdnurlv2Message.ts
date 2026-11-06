import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_getdigitalassetcdnurlv2Response as msdynmkt_getdigitalassetcdnurlv2ResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_getdigitalassetcdnurlv2 message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getdigitalassetcdnurlv2RequestParameters {
  msdynmkt_fileid: string;
  msdynmkt_filetype: string;
}

/**
 * msdynmkt_getdigitalassetcdnurlv2 request message
 *
 * Web API Action: msdynmkt_getdigitalassetcdnurlv2
 */
export class msdynmkt_getdigitalassetcdnurlv2Request
  extends OrganizationRequest
  implements Executable<msdynmkt_getdigitalassetcdnurlv2Response>
{
  declare readonly Parameters: Readonly<msdynmkt_getdigitalassetcdnurlv2RequestParameters>;

  constructor(parameters: msdynmkt_getdigitalassetcdnurlv2RequestParameters) {
    super("msdynmkt_getdigitalassetcdnurlv2", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getdigitalassetcdnurlv2`;

    const body = requestBody({
      msdynmkt_fileid: this.Parameters.msdynmkt_fileid,
      msdynmkt_filetype: this.Parameters.msdynmkt_filetype,
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
    if (response.status === 204) return msdynmkt_getdigitalassetcdnurlv2Response.fromResponse({});
    return msdynmkt_getdigitalassetcdnurlv2Response.fromResponse(await response.json());
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
