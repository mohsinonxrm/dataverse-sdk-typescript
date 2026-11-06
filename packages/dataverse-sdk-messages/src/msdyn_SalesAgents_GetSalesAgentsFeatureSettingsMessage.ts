import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse as msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse.fromResponse({});
    return msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_GetSalesAgentsFeatureSettings response message
 */
export class msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponseData) {
    super("msdyn_SalesAgents_GetSalesAgentsFeatureSettings");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse {
    return new msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse(
      responseObject<msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponseData>(data)
    );
  }
}
