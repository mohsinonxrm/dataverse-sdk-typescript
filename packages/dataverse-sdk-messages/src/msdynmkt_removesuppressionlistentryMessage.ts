import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_removesuppressionlistentryResponse> {
    const data = await response.json();
    return msdynmkt_removesuppressionlistentryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_emailaddress: this.msdynmkt_emailaddress,
    };
  }
}

/**
 * msdynmkt_removesuppressionlistentry response message
 */
export class msdynmkt_removesuppressionlistentryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_removesuppressionlistentryResponse) {
    super("msdynmkt_removesuppressionlistentry");
  }

  static fromResponse(data: unknown): msdynmkt_removesuppressionlistentryResponse {
    return new msdynmkt_removesuppressionlistentryResponse((data as any).value);
  }
}
