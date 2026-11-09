import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetMicroAgentActivationDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetMicroAgentActivationDetailsRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_GetMicroAgentActivationDetails request message
 *
 * Web API Action: msdyn_SalesAgents_GetMicroAgentActivationDetails
 */
export class msdyn_SalesAgents_GetMicroAgentActivationDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetMicroAgentActivationDetailsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetMicroAgentActivationDetailsRequestParameters) {
    super("msdyn_SalesAgents_GetMicroAgentActivationDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetMicroAgentActivationDetails`;

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
  ): Promise<msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetMicroAgentActivationDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetMicroAgentActivationDetailsResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_GetMicroAgentActivationDetails response message
 *
 * `result` is the value the msdyn_SalesAgents_GetMicroAgentActivationDetails action returns (see {@link msdyn_SalesAgents_GetMicroAgentActivationDetailsResult}).
 */
export class msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetMicroAgentActivationDetailsResult) {
    super("msdyn_SalesAgents_GetMicroAgentActivationDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse {
    return new msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse(
      data as msdyn_SalesAgents_GetMicroAgentActivationDetailsResult
    );
  }
}
