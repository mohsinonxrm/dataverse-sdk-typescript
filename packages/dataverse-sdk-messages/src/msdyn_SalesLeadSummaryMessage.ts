import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesLeadSummaryResponse as msdyn_SalesLeadSummaryResponseData } from "./types/index.js";

/**
 * msdyn_SalesLeadSummary request message
 *
 * Web API Action: msdyn_SalesLeadSummary
 */
export class msdyn_SalesLeadSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesLeadSummaryResponse>
{
  constructor(
    public msdyn_additionalParams: string,
    public msdyn_activityId: string,
    public msdyn_doSuggestUpdates: boolean,
    public msdyn_parentContactId: string,
    public msdyn_id: string,
    public msdyn_lastComputationTime: string,
    public msdyn_isMergedCatchupAndSummary: boolean,
    public msdyn_skipHeader: string,
    public msdyn_sessionId: string,
    public msdyn_parentAccountId: string,
    public msdyn_responseFormat: string
  ) {
    super("msdyn_SalesLeadSummary");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadSummary`;

    const body: Record<string, unknown> = {
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_doSuggestUpdates: this.msdyn_doSuggestUpdates,
      msdyn_parentContactId: this.msdyn_parentContactId,
      msdyn_id: this.msdyn_id,
      msdyn_lastComputationTime: this.msdyn_lastComputationTime,
      msdyn_isMergedCatchupAndSummary: this.msdyn_isMergedCatchupAndSummary,
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_parentAccountId: this.msdyn_parentAccountId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadSummaryResponse> {
    const data = await response.json();
    return msdyn_SalesLeadSummaryResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesLeadSummary response message
 */
export class msdyn_SalesLeadSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesLeadSummaryResponseData) {
    super("msdyn_SalesLeadSummary");
  }

  static fromResponse(data: unknown): msdyn_SalesLeadSummaryResponse {
    return new msdyn_SalesLeadSummaryResponse(
      responseObject<msdyn_SalesLeadSummaryResponseData>(data)
    );
  }
}
