import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesLeadSummaryResponse as msdyn_SalesLeadSummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesLeadSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesLeadSummaryRequestParameters {
  msdyn_additionalParams?: string;
  msdyn_activityId?: string;
  msdyn_doSuggestUpdates?: boolean;
  msdyn_parentContactId?: string;
  msdyn_id: string;
  msdyn_lastComputationTime?: string;
  msdyn_isMergedCatchupAndSummary?: boolean;
  msdyn_skipHeader?: string;
  msdyn_sessionId?: string;
  msdyn_parentAccountId?: string;
  msdyn_responseFormat?: string;
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
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_doSuggestUpdates: this.Parameters.msdyn_doSuggestUpdates,
      msdyn_parentContactId: this.Parameters.msdyn_parentContactId,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_lastComputationTime: this.Parameters.msdyn_lastComputationTime,
      msdyn_isMergedCatchupAndSummary: this.Parameters.msdyn_isMergedCatchupAndSummary,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_parentAccountId: this.Parameters.msdyn_parentAccountId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadSummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesLeadSummaryResponse.fromResponse({});
    return msdyn_SalesLeadSummaryResponse.fromResponse(await response.json());
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
