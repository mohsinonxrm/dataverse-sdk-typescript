import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_removesuppressionlistentryResponse as msdynmkt_removesuppressionlistentryResponseData } from "./types/index.js";

/**
 * msdynmkt_removesuppressionlistentry request message
 *
 * Web API Action: msdynmkt_removesuppressionlistentry
 */
export class msdynmkt_removesuppressionlistentryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_removesuppressionlistentryResponse>
{
  constructor(public msdynmkt_emailaddress: string) {
    super("msdynmkt_removesuppressionlistentry");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_removesuppressionlistentry`;

    const body: Record<string, unknown> = {
      msdynmkt_emailaddress: this.msdynmkt_emailaddress,
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

  async parseResponse(response: Response): Promise<msdynmkt_removesuppressionlistentryResponse> {
    const data = await response.json();
    return msdynmkt_removesuppressionlistentryResponse.fromResponse(data);
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
