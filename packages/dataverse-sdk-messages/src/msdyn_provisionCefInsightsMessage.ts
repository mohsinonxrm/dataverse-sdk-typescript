import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_provisionCefInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_provisionCefInsightsRequestParameters {
  msdyn_provisioningMode?: string;
  msdyn_insightIdsJson?: string;
  msdyn_requestId: string;
  msdyn_requestOptions?: string;
}

/**
 * msdyn_provisionCefInsights request message
 *
 * Web API Action: msdyn_provisionCefInsights
 */
export class msdyn_provisionCefInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_provisionCefInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_provisionCefInsightsRequestParameters>;

  constructor(parameters: msdyn_provisionCefInsightsRequestParameters) {
    super("msdyn_provisionCefInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_provisionCefInsights`;

    const body = requestBody({
      msdyn_provisioningMode: this.Parameters.msdyn_provisioningMode,
      msdyn_insightIdsJson: this.Parameters.msdyn_insightIdsJson,
      msdyn_requestId: this.Parameters.msdyn_requestId,
      msdyn_requestOptions: this.Parameters.msdyn_requestOptions,
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

  async parseResponse(response: Response): Promise<msdyn_provisionCefInsightsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_provisionCefInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_provisionCefInsights action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_provisionCefInsightsResult {
  "@odata.context"?: string;
  msdyn_jobId: string;
  msdyn_responseStatus: string;
}

/**
 * msdyn_provisionCefInsights response message
 *
 * `result` is the value the msdyn_provisionCefInsights action returns (see {@link msdyn_provisionCefInsightsResult}).
 */
export class msdyn_provisionCefInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_provisionCefInsightsResult) {
    super("msdyn_provisionCefInsights");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_provisionCefInsightsResponse {
    return new msdyn_provisionCefInsightsResponse(data as msdyn_provisionCefInsightsResult);
  }
}
