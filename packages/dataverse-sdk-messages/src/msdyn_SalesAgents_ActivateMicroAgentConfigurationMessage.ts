import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_ActivateMicroAgentConfiguration request message
 *
 * Web API Action: msdyn_SalesAgents_ActivateMicroAgentConfiguration
 */
export class msdyn_SalesAgents_ActivateMicroAgentConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse>
{
  constructor(public requestJson: string) {
    super("msdyn_SalesAgents_ActivateMicroAgentConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateMicroAgentConfiguration`;

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
  ): Promise<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequestJson: this.requestJson,
    };
  }
}

/**
 * msdyn_SalesAgents_ActivateMicroAgentConfiguration response message
 */
export class msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse) {
    super("msdyn_SalesAgents_ActivateMicroAgentConfiguration");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse {
    return new msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse((data as any).value);
  }
}
