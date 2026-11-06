import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgent_GetAgentUserResponse as msdyn_SalesAgent_GetAgentUserResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgent_GetAgentUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_GetAgentUserRequestParameters {
  SearchTerm?: string[];
}

/**
 * msdyn_SalesAgent_GetAgentUser request message
 *
 * Web API Action: msdyn_SalesAgent_GetAgentUser
 */
export class msdyn_SalesAgent_GetAgentUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgent_GetAgentUserResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgent_GetAgentUserRequestParameters>;

  constructor(parameters: msdyn_SalesAgent_GetAgentUserRequestParameters = {}) {
    super("msdyn_SalesAgent_GetAgentUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_GetAgentUser`;

    const body = requestBody({
      SearchTerm: this.Parameters.SearchTerm,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_GetAgentUserResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesAgent_GetAgentUserResponse.fromResponse({});
    return msdyn_SalesAgent_GetAgentUserResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgent_GetAgentUser response message
 */
export class msdyn_SalesAgent_GetAgentUserResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_GetAgentUserResponseData) {
    super("msdyn_SalesAgent_GetAgentUser");
  }

  static fromResponse(data: unknown): msdyn_SalesAgent_GetAgentUserResponse {
    return new msdyn_SalesAgent_GetAgentUserResponse(
      responseObject<msdyn_SalesAgent_GetAgentUserResponseData>(data)
    );
  }
}
