import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_RetrieveAnalyitcsAriaCountsResponse as msdynmkt_RetrieveAnalyitcsAriaCountsResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_RetrieveAnalyitcsAriaCounts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveAnalyitcsAriaCountsRequestParameters {
  msdynmkt_appname: string;
  msdynmkt_primaryrecordid: string;
  msdynmkt_ariacountsrequest: string;
  msdynmkt_primaryrecordentityname: string;
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
      msdynmkt_appname: this.Parameters.msdynmkt_appname,
      msdynmkt_primaryrecordid: this.Parameters.msdynmkt_primaryrecordid,
      msdynmkt_ariacountsrequest: this.Parameters.msdynmkt_ariacountsrequest,
      msdynmkt_primaryrecordentityname: this.Parameters.msdynmkt_primaryrecordentityname,
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
    if (response.status === 204)
      return msdynmkt_RetrieveAnalyitcsAriaCountsResponse.fromResponse({});
    return msdynmkt_RetrieveAnalyitcsAriaCountsResponse.fromResponse(await response.json());
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
