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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SalesAgents_GetSalesAgentsFeatureSettings response message
 */
export class msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse) {
    super("msdyn_SalesAgents_GetSalesAgentsFeatureSettings");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse {
    return new msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse((data as any).value);
  }
}
