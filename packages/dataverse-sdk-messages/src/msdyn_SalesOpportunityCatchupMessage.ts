import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesOpportunityCatchup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOpportunityCatchupRequestParameters {
  msdyn_activityId?: string;
  msdyn_id: string;
  msdyn_since?: string;
  msdyn_additionalParams?: string;
  msdyn_skipHeader?: string;
  msdyn_sessionId?: string;
  msdyn_responseFormat?: string;
}

/**
 * msdyn_SalesOpportunityCatchup request message
 *
 * Web API Action: msdyn_SalesOpportunityCatchup
 */
export class msdyn_SalesOpportunityCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOpportunityCatchupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesOpportunityCatchupRequestParameters>;

  constructor(parameters: msdyn_SalesOpportunityCatchupRequestParameters) {
    super("msdyn_SalesOpportunityCatchup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunityCatchup`;

    const body = requestBody({
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_since: this.Parameters.msdyn_since,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunityCatchupResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesOpportunityCatchupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesOpportunityCatchup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesOpportunityCatchupResult {
  "@odata.context"?: string;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesOpportunityCatchup response message
 *
 * `result` is the value the msdyn_SalesOpportunityCatchup action returns (see {@link msdyn_SalesOpportunityCatchupResult}).
 */
export class msdyn_SalesOpportunityCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOpportunityCatchupResult) {
    super("msdyn_SalesOpportunityCatchup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesOpportunityCatchupResponse {
    return new msdyn_SalesOpportunityCatchupResponse(data as msdyn_SalesOpportunityCatchupResult);
  }
}
