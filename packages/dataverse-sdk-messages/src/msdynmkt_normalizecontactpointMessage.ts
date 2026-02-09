import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_normalizecontactpoint request message
 *
 * Web API Action: msdynmkt_normalizecontactpoint
 */
export class msdynmkt_normalizecontactpointRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_normalizecontactpointResponse>
{
  constructor(
    public msdynmkt_contactpointvalue: string,
    public msdynmkt_contactpointtype: number
  ) {
    super("msdynmkt_normalizecontactpoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_normalizecontactpoint`;

    const body: Record<string, unknown> = {
      msdynmkt_contactpointvalue: this.msdynmkt_contactpointvalue,
      msdynmkt_contactpointtype: this.msdynmkt_contactpointtype,
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

  async parseResponse(response: Response): Promise<msdynmkt_normalizecontactpointResponse> {
    const data = await response.json();
    return msdynmkt_normalizecontactpointResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_contactpointvalue: this.msdynmkt_contactpointvalue,
      msdynmkt_contactpointtype: this.msdynmkt_contactpointtype,
    };
  }
}

/**
 * msdynmkt_normalizecontactpoint response message
 */
export class msdynmkt_normalizecontactpointResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_normalizecontactpointResponse) {
    super("msdynmkt_normalizecontactpoint");
  }

  static fromResponse(data: unknown): msdynmkt_normalizecontactpointResponse {
    return new msdynmkt_normalizecontactpointResponse((data as any).value);
  }
}
