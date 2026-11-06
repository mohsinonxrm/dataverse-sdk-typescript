import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_removesuppressionlistentryResponse as msdynmkt_removesuppressionlistentryResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_removesuppressionlistentry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_removesuppressionlistentryRequestParameters {
  msdynmkt_emailaddress: string;
}

/**
 * msdynmkt_removesuppressionlistentry request message
 *
 * Web API Action: msdynmkt_removesuppressionlistentry
 */
export class msdynmkt_removesuppressionlistentryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_removesuppressionlistentryResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_removesuppressionlistentryRequestParameters>;

  constructor(parameters: msdynmkt_removesuppressionlistentryRequestParameters) {
    super("msdynmkt_removesuppressionlistentry", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_removesuppressionlistentry`;

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

  async parseResponse(response: Response): Promise<msdynmkt_removesuppressionlistentryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_removesuppressionlistentryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdynmkt_removesuppressionlistentry response message
 */
export class msdynmkt_removesuppressionlistentryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_removesuppressionlistentryResponseData) {
    super("msdynmkt_removesuppressionlistentry");
  }

  static fromResponse(data: unknown): msdynmkt_removesuppressionlistentryResponse {
    return new msdynmkt_removesuppressionlistentryResponse(
      responseObject<msdynmkt_removesuppressionlistentryResponseData>(data)
    );
  }
}
