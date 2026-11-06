import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_RetrieveAnalyitcsAriaCounts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsRequestParameters {
  msdynmkt_primaryrecordentityname: string;
  msdynmkt_ariacountsrequest: string;
  msdynmkt_appname: string;
  msdynmkt_primaryrecordid: string;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCounts request message
 *
 * Web API Action: msdynmkt_RetrieveAnalyitcsAriaCounts
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_RetrieveAnalyitcsAriaCountsRequestParameters>;

  constructor(parameters: msdynmkt_RetrieveAnalyitcsAriaCountsRequestParameters) {
    super("msdynmkt_RetrieveAnalyitcsAriaCounts", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveAnalyitcsAriaCounts`;

    const body = requestBody({
      msdynmkt_primaryrecordentityname: this.Parameters.msdynmkt_primaryrecordentityname,
      msdynmkt_ariacountsrequest: this.Parameters.msdynmkt_ariacountsrequest,
      msdynmkt_appname: this.Parameters.msdynmkt_appname,
      msdynmkt_primaryrecordid: this.Parameters.msdynmkt_primaryrecordid,
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
    // The body is the complex value, with its @odata.context
    return msdynmkt_RetrieveAnalyitcsAriaCountsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_RetrieveAnalyitcsAriaCounts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsResult {
  "@odata.context"?: string;
  msdynmkt_apiresponsedata: string;
  msdynmkt_error: string;
  msdynmkt_resultcode: number;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCounts response message
 *
 * `result` is the value the msdynmkt_RetrieveAnalyitcsAriaCounts action returns (see {@link msdynmkt_RetrieveAnalyitcsAriaCountsResult}).
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveAnalyitcsAriaCountsResult) {
    super("msdynmkt_RetrieveAnalyitcsAriaCounts");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_RetrieveAnalyitcsAriaCountsResponse {
    return new msdynmkt_RetrieveAnalyitcsAriaCountsResponse(
      data as msdynmkt_RetrieveAnalyitcsAriaCountsResult
    );
  }
}
