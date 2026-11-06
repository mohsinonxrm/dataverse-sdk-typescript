import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdynmkt_getdigitalassetcdnurlv2Response.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_getdigitalassetcdnurlv2 action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getdigitalassetcdnurlv2Result {
  "@odata.context"?: string;
  msdynmkt_filecdnurl: string;
}

/**
 * msdynmkt_getdigitalassetcdnurlv2 response message
 *
 * `result` is the value the msdynmkt_getdigitalassetcdnurlv2 action returns (see {@link msdynmkt_getdigitalassetcdnurlv2Result}).
 */
export class msdynmkt_getdigitalassetcdnurlv2Response extends OrganizationResponse {
  constructor(public result: msdynmkt_getdigitalassetcdnurlv2Result) {
    super("msdynmkt_getdigitalassetcdnurlv2");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_getdigitalassetcdnurlv2Response {
    return new msdynmkt_getdigitalassetcdnurlv2Response(
      data as msdynmkt_getdigitalassetcdnurlv2Result
    );
  }
}
