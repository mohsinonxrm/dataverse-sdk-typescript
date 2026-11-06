import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesOpportunitySummaryResponse as msdyn_SalesOpportunitySummaryResponseData } from "./types/index.js";

/**
 * msdyn_SalesOpportunitySummary request message
 *
 * Web API Action: msdyn_SalesOpportunitySummary
 */
export class msdyn_SalesOpportunitySummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOpportunitySummaryResponse>
{
  constructor(
    public msdyn_skipHeader: string | undefined,
    public msdyn_lastComputationTime: string | undefined,
    public msdyn_id: string,
    public msdyn_isMergedCatchupAndSummary?: boolean,
    public msdyn_additionalParams?: string,
    public msdyn_sessionId?: string,
    public msdyn_activityId?: string,
    public msdyn_responseFormat?: string
  ) {
    super("msdyn_SalesOpportunitySummary");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunitySummary`;

    const body: Record<string, unknown> = {
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_lastComputationTime: this.msdyn_lastComputationTime,
      msdyn_id: this.msdyn_id,
      msdyn_isMergedCatchupAndSummary: this.msdyn_isMergedCatchupAndSummary,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_responseFormat: this.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunitySummaryResponse> {
    const data = await response.json();
    return msdyn_SalesOpportunitySummaryResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesOpportunitySummary response message
 */
export class msdyn_SalesOpportunitySummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOpportunitySummaryResponseData) {
    super("msdyn_SalesOpportunitySummary");
  }

  static fromResponse(data: unknown): msdyn_SalesOpportunitySummaryResponse {
    return new msdyn_SalesOpportunitySummaryResponse(
      responseObject<msdyn_SalesOpportunitySummaryResponseData>(data)
    );
  }
}
