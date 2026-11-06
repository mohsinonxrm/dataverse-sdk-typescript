import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse as msdyn_SalesAgents_ActivateMicroAgentConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_ActivateMicroAgentConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ActivateMicroAgentConfigurationRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_ActivateMicroAgentConfiguration request message
 *
 * Web API Action: msdyn_SalesAgents_ActivateMicroAgentConfiguration
 */
export class msdyn_SalesAgents_ActivateMicroAgentConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ActivateMicroAgentConfigurationRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ActivateMicroAgentConfigurationRequestParameters) {
    super("msdyn_SalesAgents_ActivateMicroAgentConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateMicroAgentConfiguration`;

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
  ): Promise<msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
