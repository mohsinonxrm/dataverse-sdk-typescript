import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAccountSummaryResponse as msdyn_SalesAccountSummaryResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesAccountSummaryResponse.fromResponse({});
    return msdyn_SalesAccountSummaryResponse.fromResponse(await response.json());
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
