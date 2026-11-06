import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_RetrieveAnalyitcsAriaCounts action
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsResponse {
  msdynmkt_apiresponsedata: string;
  msdynmkt_error: string;
  msdynmkt_resultcode: number;
}

/**
 * Parameters of the msdynmkt_RetrieveAnalyitcsAriaCounts action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsActionParameters {
  msdynmkt_primaryrecordentityname: string;
  msdynmkt_ariacountsrequest: string;
  msdynmkt_appname: string;
  msdynmkt_primaryrecordid: string;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCounts action
 *
 * Unbound action
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsAction implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsResponse> {
  constructor(public readonly parameters: msdynmkt_RetrieveAnalyitcsAriaCountsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveAnalyitcsAriaCounts`;

    const body = requestBody({
      msdynmkt_primaryrecordentityname: this.parameters.msdynmkt_primaryrecordentityname,
      msdynmkt_ariacountsrequest: this.parameters.msdynmkt_ariacountsrequest,
      msdynmkt_appname: this.parameters.msdynmkt_appname,
      msdynmkt_primaryrecordid: this.parameters.msdynmkt_primaryrecordid,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_RetrieveAnalyitcsAriaCountsResponse;
    return (await response.json()) as msdynmkt_RetrieveAnalyitcsAriaCountsResponse;
  }
}
