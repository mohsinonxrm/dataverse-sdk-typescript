import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_getsuppressionlistentryResponse as msdynmkt_getsuppressionlistentryResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_getsuppressionlistentry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getsuppressionlistentryRequestParameters {
  msdynmkt_emailaddress: string;
}

/**
 * msdynmkt_getsuppressionlistentry request message
 *
 * Web API Action: msdynmkt_getsuppressionlistentry
 */
export class msdynmkt_getsuppressionlistentryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getsuppressionlistentryResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_getsuppressionlistentryRequestParameters>;

  constructor(parameters: msdynmkt_getsuppressionlistentryRequestParameters) {
    super("msdynmkt_getsuppressionlistentry", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentry`;

    const body = requestBody({
      msdynmkt_emailaddress: this.Parameters.msdynmkt_emailaddress,
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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_getsuppressionlistentryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdynmkt_getsuppressionlistentry response message
 */
export class msdynmkt_getsuppressionlistentryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getsuppressionlistentryResponseData) {
    super("msdynmkt_getsuppressionlistentry");
  }

  static fromResponse(data: unknown): msdynmkt_getsuppressionlistentryResponse {
    return new msdynmkt_getsuppressionlistentryResponse(
      responseObject<msdynmkt_getsuppressionlistentryResponseData>(data)
    );
  }
}
