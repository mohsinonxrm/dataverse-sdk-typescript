import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesOpportunitySummaryResponse as msdyn_SalesOpportunitySummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesOpportunitySummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOpportunitySummaryRequestParameters {
  msdyn_skipHeader?: string;
  msdyn_lastComputationTime?: string;
  msdyn_id: string;
  msdyn_isMergedCatchupAndSummary?: boolean;
  msdyn_additionalParams?: string;
  msdyn_sessionId?: string;
  msdyn_activityId?: string;
  msdyn_responseFormat?: string;
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
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_lastComputationTime: this.Parameters.msdyn_lastComputationTime,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_isMergedCatchupAndSummary: this.Parameters.msdyn_isMergedCatchupAndSummary,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_activityId: this.Parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunitySummaryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesOpportunitySummaryResponse.fromResponse(text ? JSON.parse(text) : {});
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
