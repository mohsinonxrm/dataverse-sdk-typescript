import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ValidateContactabilityResponse as msdyn_SalesAgents_ValidateContactabilityResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_ValidateContactabilityResponse.fromResponse({});
    return msdyn_SalesAgents_ValidateContactabilityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_ValidateContactability response message
 */
export class msdyn_SalesAgents_ValidateContactabilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ValidateContactabilityResponseData) {
    super("msdyn_SalesAgents_ValidateContactability");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ValidateContactabilityResponse {
    return new msdyn_SalesAgents_ValidateContactabilityResponse(
      responseObject<msdyn_SalesAgents_ValidateContactabilityResponseData>(data)
    );
  }
}
