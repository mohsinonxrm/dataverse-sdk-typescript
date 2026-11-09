import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_ActivateMicroAgentConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ActivateMicroAgentConfigurationResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_ActivateMicroAgentConfiguration response message
 *
 * `result` is the value the msdyn_SalesAgents_ActivateMicroAgentConfiguration action returns (see {@link msdyn_SalesAgents_ActivateMicroAgentConfigurationResult}).
 */
export class msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateMicroAgentConfigurationResult) {
    super("msdyn_SalesAgents_ActivateMicroAgentConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse {
    return new msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse(
      data as msdyn_SalesAgents_ActivateMicroAgentConfigurationResult
    );
  }
}
