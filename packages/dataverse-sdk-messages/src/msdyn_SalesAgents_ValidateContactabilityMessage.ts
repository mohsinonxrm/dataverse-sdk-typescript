import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ValidateContactability message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ValidateContactabilityRequestParameters {
  msdyn_Contacts?: string;
}

/**
 * msdyn_SalesAgents_ValidateContactability request message
 *
 * Web API Action: msdyn_SalesAgents_ValidateContactability
 */
export class msdyn_SalesAgents_ValidateContactabilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ValidateContactabilityResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ValidateContactabilityRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ValidateContactabilityRequestParameters = {}) {
    super("msdyn_SalesAgents_ValidateContactability", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ValidateContactability`;

    const body = requestBody({
      msdyn_Contacts: this.Parameters.msdyn_Contacts,
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
  ): Promise<msdyn_SalesAgents_ValidateContactabilityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ValidateContactabilityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_ValidateContactability action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ValidateContactabilityResult {
  "@odata.context"?: string;
  msdyn_Contacts: string;
}

/**
 * msdyn_SalesAgents_ValidateContactability response message
 *
 * `result` is the value the msdyn_SalesAgents_ValidateContactability action returns (see {@link msdyn_SalesAgents_ValidateContactabilityResult}).
 */
export class msdyn_SalesAgents_ValidateContactabilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ValidateContactabilityResult) {
    super("msdyn_SalesAgents_ValidateContactability");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ValidateContactabilityResponse {
    return new msdyn_SalesAgents_ValidateContactabilityResponse(
      data as msdyn_SalesAgents_ValidateContactabilityResult
    );
  }
}
