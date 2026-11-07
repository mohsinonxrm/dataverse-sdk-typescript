import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAccountCatchup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAccountCatchupRequestParameters {
  msdyn_sessionId?: string;
  msdyn_additionalParams?: string;
  msdyn_skipHeader?: string;
  msdyn_responseFormat?: string;
  msdyn_id: string;
  msdyn_activityId?: string;
  msdyn_since?: string;
}

/**
 * msdyn_SalesAccountCatchup request message
 *
 * Web API Action: msdyn_SalesAccountCatchup
 */
export class msdyn_SalesAccountCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAccountCatchupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAccountCatchupRequestParameters>;

  constructor(parameters: msdyn_SalesAccountCatchupRequestParameters) {
    super("msdyn_SalesAccountCatchup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountCatchup`;

    const body = requestBody({
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_since: this.Parameters.msdyn_since,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAccountCatchupResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAccountCatchupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAccountCatchup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAccountCatchupResult {
  "@odata.context"?: string;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesAccountCatchup response message
 *
 * `result` is the value the msdyn_SalesAccountCatchup action returns (see {@link msdyn_SalesAccountCatchupResult}).
 */
export class msdyn_SalesAccountCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAccountCatchupResult) {
    super("msdyn_SalesAccountCatchup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAccountCatchupResponse {
    return new msdyn_SalesAccountCatchupResponse(data as msdyn_SalesAccountCatchupResult);
  }
}
