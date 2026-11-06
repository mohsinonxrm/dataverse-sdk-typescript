import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse as msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequestParameters {
  msdynmkt_primaryrecordid: string;
  msdynmkt_primaryrecordentityname: string;
  msdynmkt_ariacountsrequest: string;
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
      msdynmkt_primaryrecordid: this.Parameters.msdynmkt_primaryrecordid,
      msdynmkt_primaryrecordentityname: this.Parameters.msdynmkt_primaryrecordentityname,
      msdynmkt_ariacountsrequest: this.Parameters.msdynmkt_ariacountsrequest,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse.fromResponse({});
    return msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery response message
 */
export class msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponseData) {
    super("msdynmkt_RetrieveAnalyitcsAriaCountsWithQuery");
  }

  static fromResponse(data: unknown): msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse {
    return new msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse(
      responseObject<msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponseData>(data)
    );
  }
}
