import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetMicroAgentsConfigurationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetMicroAgentsConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetMicroAgentsConfigurationResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_GetMicroAgentsConfiguration response message
 *
 * `result` is the value the msdyn_SalesAgents_GetMicroAgentsConfiguration action returns (see {@link msdyn_SalesAgents_GetMicroAgentsConfigurationResult}).
 */
export class msdyn_SalesAgents_GetMicroAgentsConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetMicroAgentsConfigurationResult) {
    super("msdyn_SalesAgents_GetMicroAgentsConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetMicroAgentsConfigurationResponse {
    return new msdyn_SalesAgents_GetMicroAgentsConfigurationResponse(
      data as msdyn_SalesAgents_GetMicroAgentsConfigurationResult
    );
  }
}
