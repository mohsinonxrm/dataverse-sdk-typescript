import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_setCefInsightsEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_setCefInsightsEnabledRequestParameters {
  msdyn_isEnabled: boolean;
  msdyn_requestId: string;
  msdyn_insightIdsJson: string;
  msdyn_requestOptions?: string;
}

/**
 * msdyn_setCefInsightsEnabled request message
 *
 * Web API Action: msdyn_setCefInsightsEnabled
 */
export class msdyn_setCefInsightsEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_setCefInsightsEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_setCefInsightsEnabledRequestParameters>;

  constructor(parameters: msdyn_setCefInsightsEnabledRequestParameters) {
    super("msdyn_setCefInsightsEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_setCefInsightsEnabled`;

    const body = requestBody({
      msdyn_isEnabled: this.Parameters.msdyn_isEnabled,
      msdyn_requestId: this.Parameters.msdyn_requestId,
      msdyn_insightIdsJson: this.Parameters.msdyn_insightIdsJson,
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

  async parseResponse(response: Response): Promise<msdyn_setCefInsightsEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_setCefInsightsEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_setCefInsightsEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_setCefInsightsEnabledResult {
  "@odata.context"?: string;
  msdyn_responseStatus: string;
}

/**
 * msdyn_setCefInsightsEnabled response message
 *
 * `result` is the value the msdyn_setCefInsightsEnabled action returns (see {@link msdyn_setCefInsightsEnabledResult}).
 */
export class msdyn_setCefInsightsEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_setCefInsightsEnabledResult) {
    super("msdyn_setCefInsightsEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_setCefInsightsEnabledResponse {
    return new msdyn_setCefInsightsEnabledResponse(data as msdyn_setCefInsightsEnabledResult);
  }
}
