import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RAAgent_UpsertRecommendationAgentConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_UpsertRecommendationAgentConfigRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_RAAgent_UpsertRecommendationAgentConfig request message
 *
 * Web API Action: msdyn_RAAgent_UpsertRecommendationAgentConfig
 */
export class msdyn_RAAgent_UpsertRecommendationAgentConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_RAAgent_UpsertRecommendationAgentConfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_RAAgent_UpsertRecommendationAgentConfigRequestParameters>;

  constructor(parameters: msdyn_RAAgent_UpsertRecommendationAgentConfigRequestParameters) {
    super("msdyn_RAAgent_UpsertRecommendationAgentConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_UpsertRecommendationAgentConfig`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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
  ): Promise<msdyn_RAAgent_UpsertRecommendationAgentConfigResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RAAgent_UpsertRecommendationAgentConfigResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_RAAgent_UpsertRecommendationAgentConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RAAgent_UpsertRecommendationAgentConfigResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_RAAgent_UpsertRecommendationAgentConfig response message
 *
 * `result` is the value the msdyn_RAAgent_UpsertRecommendationAgentConfig action returns (see {@link msdyn_RAAgent_UpsertRecommendationAgentConfigResult}).
 */
export class msdyn_RAAgent_UpsertRecommendationAgentConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_RAAgent_UpsertRecommendationAgentConfigResult) {
    super("msdyn_RAAgent_UpsertRecommendationAgentConfig");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RAAgent_UpsertRecommendationAgentConfigResponse {
    return new msdyn_RAAgent_UpsertRecommendationAgentConfigResponse(
      data as msdyn_RAAgent_UpsertRecommendationAgentConfigResult
    );
  }
}
