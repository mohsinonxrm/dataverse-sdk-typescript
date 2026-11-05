import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery action
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse {
  msdynmkt_resultcode: number;
  msdynmkt_error: string;
  msdynmkt_apiresponsedata: string;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery action
 *
 * Unbound action
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryAction implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse> {
  constructor(
    public readonly msdynmkt_primaryrecordid: string,
    public readonly msdynmkt_primaryrecordentityname: string,
    public readonly msdynmkt_ariacountsrequest: string,
    public readonly msdynmkt_appname: string
  ) {}

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
    return data as msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse;
  }
}
