import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesOpportunitySummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOpportunitySummaryRequestParameters {
  msdyn_lastComputationTime?: string;
  msdyn_sessionId?: string;
  msdyn_additionalParams?: string;
  msdyn_isMergedCatchupAndSummary?: boolean;
  msdyn_id: string;
  msdyn_skipHeader?: string;
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
}

/**
 * msdyn_SalesOpportunitySummary request message
 *
 * Web API Action: msdyn_SalesOpportunitySummary
 */
export class msdyn_SalesOpportunitySummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOpportunitySummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesOpportunitySummaryRequestParameters>;

  constructor(parameters: msdyn_SalesOpportunitySummaryRequestParameters) {
    super("msdyn_SalesOpportunitySummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunitySummary`;

    const body = requestBody({
      msdyn_lastComputationTime: this.Parameters.msdyn_lastComputationTime,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_isMergedCatchupAndSummary: this.Parameters.msdyn_isMergedCatchupAndSummary,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_activityId: this.Parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunitySummaryResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesOpportunitySummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesOpportunitySummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesOpportunitySummaryResult {
  "@odata.context"?: string;
  msdyn_additionalDetails: string;
  msdyn_canUseCache: boolean;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesOpportunitySummary response message
 *
 * `result` is the value the msdyn_SalesOpportunitySummary action returns (see {@link msdyn_SalesOpportunitySummaryResult}).
 */
export class msdyn_SalesOpportunitySummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOpportunitySummaryResult) {
    super("msdyn_SalesOpportunitySummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesOpportunitySummaryResponse {
    return new msdyn_SalesOpportunitySummaryResponse(data as msdyn_SalesOpportunitySummaryResult);
  }
}
