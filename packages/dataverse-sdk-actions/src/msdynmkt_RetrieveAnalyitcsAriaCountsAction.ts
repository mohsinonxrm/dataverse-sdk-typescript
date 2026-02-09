import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_RetrieveAnalyitcsAriaCounts action
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsResponse {
  msdynmkt_resultcode: number;
  msdynmkt_apiresponsedata: string;
  msdynmkt_error: string;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCounts action
 *
 * Unbound action
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsAction implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsResponse> {
  constructor(
    public readonly msdynmkt_appname: string,
    public readonly msdynmkt_primaryrecordid: string,
    public readonly msdynmkt_ariacountsrequest: string,
    public readonly msdynmkt_primaryrecordentityname: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveAnalyitcsAriaCountsResponse> {
    const data = await response.json();
    return data as msdynmkt_RetrieveAnalyitcsAriaCountsResponse;
  }
}
