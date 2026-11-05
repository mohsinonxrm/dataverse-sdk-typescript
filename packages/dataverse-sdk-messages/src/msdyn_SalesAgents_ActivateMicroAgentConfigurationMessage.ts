import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse as msdyn_SalesAgents_ActivateMicroAgentConfigurationResponseData } from "./types/index.js";

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
        "content-type": "application/json",
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
}

/**
 * msdyn_SalesAgents_ActivateMicroAgentConfiguration response message
 */
export class msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateMicroAgentConfigurationResponseData) {
    super("msdyn_SalesAgents_ActivateMicroAgentConfiguration");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse {
    return new msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse(
      responseObject<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponseData>(data)
    );
  }
}
