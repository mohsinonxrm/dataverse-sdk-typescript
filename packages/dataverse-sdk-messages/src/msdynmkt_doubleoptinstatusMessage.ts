import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_doubleoptinstatus request message
 *
 * Web API Action: msdynmkt_doubleoptinstatus
 */
export class msdynmkt_doubleoptinstatusRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_doubleoptinstatusResponse>
{
  constructor(
    public msdynmkt_complianceid: string,
    public dOI_Job_Status: string
  ) {
    super("msdynmkt_doubleoptinstatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_doubleoptinstatus`;

    const body: Record<string, unknown> = {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
      DOI_Job_Status: this.dOI_Job_Status,
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

  async parseResponse(response: Response): Promise<msdynmkt_doubleoptinstatusResponse> {
    const data = await response.json();
    return msdynmkt_doubleoptinstatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
      DOI_Job_Status: this.dOI_Job_Status,
    };
  }
}

/**
 * msdynmkt_doubleoptinstatus response message
 */
export class msdynmkt_doubleoptinstatusResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_doubleoptinstatusResponse) {
    super("msdynmkt_doubleoptinstatus");
  }

  static fromResponse(data: unknown): msdynmkt_doubleoptinstatusResponse {
    return new msdynmkt_doubleoptinstatusResponse((data as any).value);
  }
}
