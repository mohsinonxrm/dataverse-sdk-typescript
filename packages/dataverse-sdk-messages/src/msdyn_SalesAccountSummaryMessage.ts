import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAccountSummaryResponse as msdyn_SalesAccountSummaryResponseData } from "./types/index.js";

/**
 * msdyn_SalesAccountSummary request message
 *
 * Web API Action: msdyn_SalesAccountSummary
 */
export class msdyn_SalesAccountSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAccountSummaryResponse>
{
  constructor(
    public msdyn_sessionId: string,
    public msdyn_lastComputationTime: string,
    public msdyn_activityId: string,
    public msdyn_isMergedCatchupAndSummary: boolean,
    public msdyn_additionalParams: string,
    public msdyn_responseFormat: string,
    public msdyn_id: string,
    public msdyn_skipHeader: string
  ) {
    super("msdyn_SalesAccountSummary");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountSummary`;

    const body: Record<string, unknown> = {
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_lastComputationTime: this.msdyn_lastComputationTime,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_isMergedCatchupAndSummary: this.msdyn_isMergedCatchupAndSummary,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_id: this.msdyn_id,
      msdyn_skipHeader: this.msdyn_skipHeader,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAccountSummaryResponse> {
    const data = await response.json();
    return msdyn_SalesAccountSummaryResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesAccountSummary response message
 */
export class msdyn_SalesAccountSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAccountSummaryResponseData) {
    super("msdyn_SalesAccountSummary");
  }

  static fromResponse(data: unknown): msdyn_SalesAccountSummaryResponse {
    return new msdyn_SalesAccountSummaryResponse(
      responseObject<msdyn_SalesAccountSummaryResponseData>(data)
    );
  }
}
