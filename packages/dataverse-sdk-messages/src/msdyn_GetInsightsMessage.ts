import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetInsightsRequestParameters {
  msdyn_payload: string;
  msdyn_responseFormat?: string;
  msdyn_insighttype: string;
}

/**
 * msdyn_GetInsights request message
 *
 * Web API Action: msdyn_GetInsights
 */
export class msdyn_GetInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetInsightsRequestParameters>;

  constructor(parameters: msdyn_GetInsightsRequestParameters) {
    super("msdyn_GetInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetInsights`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_insighttype: this.Parameters.msdyn_insighttype,
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

  async parseResponse(response: Response): Promise<msdyn_GetInsightsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetInsights action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetInsightsResult {
  "@odata.context"?: string;
  msdyn_insight: string;
  msdyn_status: number;
}

/**
 * msdyn_GetInsights response message
 *
 * `result` is the value the msdyn_GetInsights action returns (see {@link msdyn_GetInsightsResult}).
 */
export class msdyn_GetInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetInsightsResult) {
    super("msdyn_GetInsights");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetInsightsResponse {
    return new msdyn_GetInsightsResponse(data as msdyn_GetInsightsResult);
  }
}
