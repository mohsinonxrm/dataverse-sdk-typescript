import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_doubleoptinstatusResponse as msdynmkt_doubleoptinstatusResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_doubleoptinstatusResponse> {
    const data = await response.json();
    return msdynmkt_doubleoptinstatusResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_doubleoptinstatus response message
 */
export class msdynmkt_doubleoptinstatusResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_doubleoptinstatusResponseData) {
    super("msdynmkt_doubleoptinstatus");
  }

  static fromResponse(data: unknown): msdynmkt_doubleoptinstatusResponse {
    return new msdynmkt_doubleoptinstatusResponse(
      responseObject<msdynmkt_doubleoptinstatusResponseData>(data)
    );
  }
}
