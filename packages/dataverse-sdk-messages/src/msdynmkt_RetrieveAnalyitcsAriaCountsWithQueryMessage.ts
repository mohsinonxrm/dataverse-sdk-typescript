import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery request message
 *
 * Web API Action: msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse>
{
  constructor(
    public msdynmkt_primaryrecordid: string,
    public msdynmkt_primaryrecordentityname: string,
    public msdynmkt_ariacountsrequest: string,
    public msdynmkt_appname: string
  ) {
    super("msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery`;

    const body: Record<string, unknown> = {
      msdynmkt_primaryrecordid: this.msdynmkt_primaryrecordid,
      msdynmkt_primaryrecordentityname: this.msdynmkt_primaryrecordentityname,
      msdynmkt_ariacountsrequest: this.msdynmkt_ariacountsrequest,
      msdynmkt_appname: this.msdynmkt_appname,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse> {
    const data = await response.json();
    return msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_primaryrecordid: this.msdynmkt_primaryrecordid,
      msdynmkt_primaryrecordentityname: this.msdynmkt_primaryrecordentityname,
      msdynmkt_ariacountsrequest: this.msdynmkt_ariacountsrequest,
      msdynmkt_appname: this.msdynmkt_appname,
    };
  }
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery response message
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse) {
    super("msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery");
  }

  static fromResponse(data: unknown): msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse {
    return new msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse((data as any).value);
  }
}
