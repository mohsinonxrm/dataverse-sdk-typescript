import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetAgentStatusAndGenAIConsent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_GetAgentStatusAndGenAIConsent request message
 *
 * Web API Action: msdyn_SalesAgents_GetAgentStatusAndGenAIConsent
 */
export class msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters) {
    super("msdyn_SalesAgents_GetAgentStatusAndGenAIConsent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetAgentStatusAndGenAIConsent`;

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
  ): Promise<msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetAgentStatusAndGenAIConsent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_GetAgentStatusAndGenAIConsent response message
 *
 * `result` is the value the msdyn_SalesAgents_GetAgentStatusAndGenAIConsent action returns (see {@link msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResult}).
 */
export class msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResult) {
    super("msdyn_SalesAgents_GetAgentStatusAndGenAIConsent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse {
    return new msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse(
      data as msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResult
    );
  }
}
