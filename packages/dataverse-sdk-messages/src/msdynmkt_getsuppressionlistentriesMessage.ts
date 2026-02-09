import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_getsuppressionlistentries request message
 *
 * Web API Action: msdynmkt_getsuppressionlistentries
 */
export class msdynmkt_getsuppressionlistentriesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getsuppressionlistentriesResponse>
{
  constructor(public msdynmkt_getsuppressionlistentriesemailaddresses: string) {
    super("msdynmkt_getsuppressionlistentries");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentries`;

    const body: Record<string, unknown> = {
      msdynmkt_getsuppressionlistentriesemailaddresses:
        this.msdynmkt_getsuppressionlistentriesemailaddresses,
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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentriesResponse> {
    const data = await response.json();
    return msdynmkt_getsuppressionlistentriesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_getsuppressionlistentriesemailaddresses:
        this.msdynmkt_getsuppressionlistentriesemailaddresses,
    };
  }
}

/**
 * msdynmkt_getsuppressionlistentries response message
 */
export class msdynmkt_getsuppressionlistentriesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getsuppressionlistentriesResponse) {
    super("msdynmkt_getsuppressionlistentries");
  }

  static fromResponse(data: unknown): msdynmkt_getsuppressionlistentriesResponse {
    return new msdynmkt_getsuppressionlistentriesResponse((data as any).value);
  }
}
