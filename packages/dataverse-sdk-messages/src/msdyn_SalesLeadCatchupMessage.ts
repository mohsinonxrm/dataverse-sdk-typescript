import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesLeadCatchup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesLeadCatchupRequestParameters {
  msdyn_additionalParams?: string;
  msdyn_sessionId?: string;
  msdyn_id: string;
  msdyn_activityId?: string;
  msdyn_skipHeader?: string;
  msdyn_since?: string;
  msdyn_responseFormat?: string;
}

/**
 * msdyn_SalesLeadCatchup request message
 *
 * Web API Action: msdyn_SalesLeadCatchup
 */
export class msdyn_SalesLeadCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesLeadCatchupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesLeadCatchupRequestParameters>;

  constructor(parameters: msdyn_SalesLeadCatchupRequestParameters) {
    super("msdyn_SalesLeadCatchup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadCatchup`;

    const body = requestBody({
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_since: this.Parameters.msdyn_since,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadCatchupResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesLeadCatchupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesLeadCatchup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesLeadCatchupResult {
  "@odata.context"?: string;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesLeadCatchup response message
 *
 * `result` is the value the msdyn_SalesLeadCatchup action returns (see {@link msdyn_SalesLeadCatchupResult}).
 */
export class msdyn_SalesLeadCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesLeadCatchupResult) {
    super("msdyn_SalesLeadCatchup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesLeadCatchupResponse {
    return new msdyn_SalesLeadCatchupResponse(data as msdyn_SalesLeadCatchupResult);
  }
}
