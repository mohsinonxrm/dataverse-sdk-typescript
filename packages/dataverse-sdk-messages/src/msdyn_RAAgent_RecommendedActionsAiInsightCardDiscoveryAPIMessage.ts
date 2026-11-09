import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequestParameters {
  ClientContext: string;
}

/**
 * msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI request message
 *
 * Web API Action: msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI
 */
export class msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse>
{
  declare readonly Parameters: Readonly<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequestParameters>;

  constructor(
    parameters: msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequestParameters
  ) {
    super("msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI response message
 *
 * `result` is the value the msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI action returns (see {@link msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResult}).
 */
export class msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResult) {
    super("msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse {
    return new msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse(
      data as msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResult
    );
  }
}
