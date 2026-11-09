import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ActivateSalesAgentProfile message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_ActivateSalesAgentProfile request message
 *
 * Web API Action: msdyn_SalesAgents_ActivateSalesAgentProfile
 */
export class msdyn_SalesAgents_ActivateSalesAgentProfileRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ActivateSalesAgentProfileResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters) {
    super("msdyn_SalesAgents_ActivateSalesAgentProfile", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateSalesAgentProfile`;

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
  ): Promise<msdyn_SalesAgents_ActivateSalesAgentProfileResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ActivateSalesAgentProfileResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_ActivateSalesAgentProfile action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ActivateSalesAgentProfileResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_ActivateSalesAgentProfile response message
 *
 * `result` is the value the msdyn_SalesAgents_ActivateSalesAgentProfile action returns (see {@link msdyn_SalesAgents_ActivateSalesAgentProfileResult}).
 */
export class msdyn_SalesAgents_ActivateSalesAgentProfileResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateSalesAgentProfileResult) {
    super("msdyn_SalesAgents_ActivateSalesAgentProfile");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateSalesAgentProfileResponse {
    return new msdyn_SalesAgents_ActivateSalesAgentProfileResponse(
      data as msdyn_SalesAgents_ActivateSalesAgentProfileResult
    );
  }
}
