import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAccountSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAccountSummaryRequestParameters {
  msdyn_additionalParams?: string;
  msdyn_activityId?: string;
  msdyn_id: string;
  msdyn_isMergedCatchupAndSummary?: boolean;
  msdyn_skipHeader?: string;
  msdyn_sessionId?: string;
  msdyn_lastComputationTime?: string;
  msdyn_responseFormat?: string;
}

/**
 * msdyn_SalesAccountSummary request message
 *
 * Web API Action: msdyn_SalesAccountSummary
 */
export class msdyn_SalesAccountSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAccountSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAccountSummaryRequestParameters>;

  constructor(parameters: msdyn_SalesAccountSummaryRequestParameters) {
    super("msdyn_SalesAccountSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountSummary`;

    const body = requestBody({
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_isMergedCatchupAndSummary: this.Parameters.msdyn_isMergedCatchupAndSummary,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_lastComputationTime: this.Parameters.msdyn_lastComputationTime,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAccountSummaryResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAccountSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAccountSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAccountSummaryResult {
  "@odata.context"?: string;
  msdyn_additionalDetails: string;
  msdyn_canUseCache: boolean;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesAccountSummary response message
 *
 * `result` is the value the msdyn_SalesAccountSummary action returns (see {@link msdyn_SalesAccountSummaryResult}).
 */
export class msdyn_SalesAccountSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAccountSummaryResult) {
    super("msdyn_SalesAccountSummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAccountSummaryResponse {
    return new msdyn_SalesAccountSummaryResponse(data as msdyn_SalesAccountSummaryResult);
  }
}
