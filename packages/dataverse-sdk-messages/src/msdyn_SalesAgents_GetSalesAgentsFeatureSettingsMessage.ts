import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_GetSalesAgentsFeatureSettings request message
 *
 * Web API Action: msdyn_SalesAgents_GetSalesAgentsFeatureSettings
 */
export class msdyn_SalesAgents_GetSalesAgentsFeatureSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse>
{
  constructor() {
    super("msdyn_SalesAgents_GetSalesAgentsFeatureSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSalesAgentsFeatureSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetSalesAgentsFeatureSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_GetSalesAgentsFeatureSettings response message
 *
 * `result` is the value the msdyn_SalesAgents_GetSalesAgentsFeatureSettings action returns (see {@link msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResult}).
 */
export class msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResult) {
    super("msdyn_SalesAgents_GetSalesAgentsFeatureSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse {
    return new msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse(
      data as msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResult
    );
  }
}
