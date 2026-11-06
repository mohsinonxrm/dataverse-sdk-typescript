import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse {
  "@odata.context"?: string;
  msdynmkt_apiresponsedata: string;
  msdynmkt_error: string;
  msdynmkt_resultcode: number;
}

/**
 * Parameters of the msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryActionParameters {
  msdynmkt_ariacountsrequest: string;
  msdynmkt_primaryrecordid: string;
  msdynmkt_primaryrecordentityname: string;
  msdynmkt_appname: string;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery action
 *
 * Unbound action
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryAction implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse> {
  constructor(
    public readonly parameters: msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery`;

    const body = requestBody({
      msdynmkt_ariacountsrequest: this.parameters.msdynmkt_ariacountsrequest,
      msdynmkt_primaryrecordid: this.parameters.msdynmkt_primaryrecordid,
      msdynmkt_primaryrecordentityname: this.parameters.msdynmkt_primaryrecordentityname,
      msdynmkt_appname: this.parameters.msdynmkt_appname,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse;
  }
}
