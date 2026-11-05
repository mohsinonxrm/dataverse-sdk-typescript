import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_GetMicroAgentsConfigurationResponse as msdyn_SalesAgents_GetMicroAgentsConfigurationResponseData } from "./types/index.js";

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
        "content-type": "application/json",
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
}

/**
 * msdyn_SalesAgents_GetMicroAgentsConfiguration response message
 */
export class msdyn_SalesAgents_GetMicroAgentsConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetMicroAgentsConfigurationResponseData) {
    super("msdyn_SalesAgents_GetMicroAgentsConfiguration");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetMicroAgentsConfigurationResponse {
    return new msdyn_SalesAgents_GetMicroAgentsConfigurationResponse(
      responseObject<msdyn_SalesAgents_GetMicroAgentsConfigurationResponseData>(data)
    );
  }
}
