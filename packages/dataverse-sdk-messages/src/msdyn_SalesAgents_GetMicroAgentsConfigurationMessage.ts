import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_GetMicroAgentsConfiguration request message
 *
 * Web API Action: msdyn_SalesAgents_GetMicroAgentsConfiguration
 */
export class msdyn_SalesAgents_GetMicroAgentsConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetMicroAgentsConfigurationResponse>
{
  constructor(public requestJson: string) {
    super("msdyn_SalesAgents_GetMicroAgentsConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetMicroAgentsConfiguration`;

    const body: Record<string, unknown> = {
      RequestJson: this.requestJson,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetMicroAgentsConfigurationResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetMicroAgentsConfigurationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequestJson: this.requestJson,
    };
  }
}

/**
 * msdyn_SalesAgents_GetMicroAgentsConfiguration response message
 */
export class msdyn_SalesAgents_GetMicroAgentsConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetMicroAgentsConfigurationResponse) {
    super("msdyn_SalesAgents_GetMicroAgentsConfiguration");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetMicroAgentsConfigurationResponse {
    return new msdyn_SalesAgents_GetMicroAgentsConfigurationResponse((data as any).value);
  }
}
