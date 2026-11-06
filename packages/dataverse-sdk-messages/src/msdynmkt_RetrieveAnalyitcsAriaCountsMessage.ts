import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_RetrieveAnalyitcsAriaCountsResponse as msdynmkt_RetrieveAnalyitcsAriaCountsResponseData } from "./types/index.js";

/**
 * msdynmkt_RetrieveAnalyitcsAriaCounts request message
 *
 * Web API Action: msdynmkt_RetrieveAnalyitcsAriaCounts
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsResponse>
{
  constructor(
    public msdynmkt_appname: string,
    public msdynmkt_primaryrecordid: string,
    public msdynmkt_ariacountsrequest: string,
    public msdynmkt_primaryrecordentityname: string
  ) {
    super("msdynmkt_RetrieveAnalyitcsAriaCounts");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveAnalyitcsAriaCounts`;

    const body: Record<string, unknown> = {
      msdynmkt_appname: this.msdynmkt_appname,
      msdynmkt_primaryrecordid: this.msdynmkt_primaryrecordid,
      msdynmkt_ariacountsrequest: this.msdynmkt_ariacountsrequest,
      msdynmkt_primaryrecordentityname: this.msdynmkt_primaryrecordentityname,
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

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveAnalyitcsAriaCountsResponse> {
    const data = await response.json();
    return msdynmkt_RetrieveAnalyitcsAriaCountsResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCounts response message
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveAnalyitcsAriaCountsResponseData) {
    super("msdynmkt_RetrieveAnalyitcsAriaCounts");
  }

  static fromResponse(data: unknown): msdynmkt_RetrieveAnalyitcsAriaCountsResponse {
    return new msdynmkt_RetrieveAnalyitcsAriaCountsResponse(
      responseObject<msdynmkt_RetrieveAnalyitcsAriaCountsResponseData>(data)
    );
  }
}
