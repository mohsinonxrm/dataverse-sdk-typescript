import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetMicroAgentsConfigurationResponse as msdyn_SalesAgents_GetMicroAgentsConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_GetMicroAgentsConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetMicroAgentsConfigurationRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_GetMicroAgentsConfiguration request message
 *
 * Web API Action: msdyn_SalesAgents_GetMicroAgentsConfiguration
 */
export class msdyn_SalesAgents_GetMicroAgentsConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetMicroAgentsConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetMicroAgentsConfigurationRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetMicroAgentsConfigurationRequestParameters) {
    super("msdyn_SalesAgents_GetMicroAgentsConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetMicroAgentsConfiguration`;

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
  ): Promise<msdyn_SalesAgents_GetMicroAgentsConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_GetMicroAgentsConfigurationResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
