import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_getsuppressionlistentry request message
 *
 * Web API Action: msdynmkt_getsuppressionlistentry
 */
export class msdynmkt_getsuppressionlistentryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getsuppressionlistentryResponse>
{
  constructor(public msdynmkt_emailaddress: string) {
    super("msdynmkt_getsuppressionlistentry");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentry`;

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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentryResponse> {
    const data = await response.json();
    return msdynmkt_getsuppressionlistentryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_emailaddress: this.msdynmkt_emailaddress,
    };
  }
}

/**
 * msdynmkt_getsuppressionlistentry response message
 */
export class msdynmkt_getsuppressionlistentryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getsuppressionlistentryResponse) {
    super("msdynmkt_getsuppressionlistentry");
  }

  static fromResponse(data: unknown): msdynmkt_getsuppressionlistentryResponse {
    return new msdynmkt_getsuppressionlistentryResponse((data as any).value);
  }
}
