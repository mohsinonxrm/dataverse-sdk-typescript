import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesLeadSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesLeadSummaryRequestParameters {
  msdyn_id: string;
  msdyn_sessionId?: string;
  msdyn_skipHeader?: string;
  msdyn_lastComputationTime?: string;
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
  msdyn_isMergedCatchupAndSummary?: boolean;
  msdyn_additionalParams?: string;
  msdyn_doSuggestUpdates?: boolean;
  msdyn_parentContactId?: string;
  msdyn_parentAccountId?: string;
}

/**
 * msdyn_SalesLeadSummary request message
 *
 * Web API Action: msdyn_SalesLeadSummary
 */
export class msdyn_SalesLeadSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesLeadSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesLeadSummaryRequestParameters>;

  constructor(parameters: msdyn_SalesLeadSummaryRequestParameters) {
    super("msdyn_SalesLeadSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadSummary`;

    const body = requestBody({
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_lastComputationTime: this.Parameters.msdyn_lastComputationTime,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_isMergedCatchupAndSummary: this.Parameters.msdyn_isMergedCatchupAndSummary,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_doSuggestUpdates: this.Parameters.msdyn_doSuggestUpdates,
      msdyn_parentContactId: this.Parameters.msdyn_parentContactId,
      msdyn_parentAccountId: this.Parameters.msdyn_parentAccountId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadSummaryResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesLeadSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesLeadSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesLeadSummaryResult {
  "@odata.context"?: string;
  msdyn_additionalDetails: string;
  msdyn_canUseCache: boolean;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesLeadSummary response message
 *
 * `result` is the value the msdyn_SalesLeadSummary action returns (see {@link msdyn_SalesLeadSummaryResult}).
 */
export class msdyn_SalesLeadSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesLeadSummaryResult) {
    super("msdyn_SalesLeadSummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesLeadSummaryResponse {
    return new msdyn_SalesLeadSummaryResponse(data as msdyn_SalesLeadSummaryResult);
  }
}
