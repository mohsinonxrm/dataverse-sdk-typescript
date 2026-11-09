import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_executeCEFInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_executeCEFInsightsRequestParameters {
  msdyn_entityId?: string;
  msdyn_insightRetrievalMode?: string;
  msdyn_requestId?: string;
  msdyn_resultPreference?: string;
  msdyn_insightIdsJson?: string;
  msdyn_requestOptions?: string;
  msdyn_entityLogicalName?: string;
}

/**
 * msdyn_executeCEFInsights request message
 *
 * Web API Action: msdyn_executeCEFInsights
 */
export class msdyn_executeCEFInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_executeCEFInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_executeCEFInsightsRequestParameters>;

  constructor(parameters: msdyn_executeCEFInsightsRequestParameters = {}) {
    super("msdyn_executeCEFInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeCEFInsights`;

    const body = requestBody({
      msdyn_entityId: this.Parameters.msdyn_entityId,
      msdyn_insightRetrievalMode: this.Parameters.msdyn_insightRetrievalMode,
      msdyn_requestId: this.Parameters.msdyn_requestId,
      msdyn_resultPreference: this.Parameters.msdyn_resultPreference,
      msdyn_insightIdsJson: this.Parameters.msdyn_insightIdsJson,
      msdyn_requestOptions: this.Parameters.msdyn_requestOptions,
      msdyn_entityLogicalName: this.Parameters.msdyn_entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_executeCEFInsightsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_executeCEFInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_executeCEFInsights action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_executeCEFInsightsResult {
  "@odata.context"?: string;
  msdyn_responsePayload: string;
  msdyn_responseStatus: string;
}

/**
 * msdyn_executeCEFInsights response message
 *
 * `result` is the value the msdyn_executeCEFInsights action returns (see {@link msdyn_executeCEFInsightsResult}).
 */
export class msdyn_executeCEFInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_executeCEFInsightsResult) {
    super("msdyn_executeCEFInsights");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_executeCEFInsightsResponse {
    return new msdyn_executeCEFInsightsResponse(data as msdyn_executeCEFInsightsResult);
  }
}
