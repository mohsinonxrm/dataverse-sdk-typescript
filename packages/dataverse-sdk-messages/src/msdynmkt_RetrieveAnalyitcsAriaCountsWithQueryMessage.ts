import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequestParameters {
  msdynmkt_ariacountsrequest: string;
  msdynmkt_primaryrecordid: string;
  msdynmkt_primaryrecordentityname: string;
  msdynmkt_appname: string;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery request message
 *
 * Web API Action: msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequestParameters>;

  constructor(parameters: msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequestParameters) {
    super("msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery`;

    const body = requestBody({
      msdynmkt_ariacountsrequest: this.Parameters.msdynmkt_ariacountsrequest,
      msdynmkt_primaryrecordid: this.Parameters.msdynmkt_primaryrecordid,
      msdynmkt_primaryrecordentityname: this.Parameters.msdynmkt_primaryrecordentityname,
      msdynmkt_appname: this.Parameters.msdynmkt_appname,
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
    return msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResult {
  "@odata.context"?: string;
  msdynmkt_apiresponsedata: string;
  msdynmkt_error: string;
  msdynmkt_resultcode: number;
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery response message
 *
 * `result` is the value the msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery action returns (see {@link msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResult}).
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResult) {
    super("msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse {
    return new msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse(
      data as msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResult
    );
  }
}
