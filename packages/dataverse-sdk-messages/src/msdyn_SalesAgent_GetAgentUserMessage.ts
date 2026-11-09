import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgent_GetAgentUserResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgent_GetAgentUser action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_GetAgentUserResult {
  "@odata.context"?: string;
  Message: string;
  ResponseJson: string;
  Success: boolean;
}

/**
 * msdyn_SalesAgent_GetAgentUser response message
 *
 * `result` is the value the msdyn_SalesAgent_GetAgentUser action returns (see {@link msdyn_SalesAgent_GetAgentUserResult}).
 */
export class msdyn_SalesAgent_GetAgentUserResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_GetAgentUserResult) {
    super("msdyn_SalesAgent_GetAgentUser");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgent_GetAgentUserResponse {
    return new msdyn_SalesAgent_GetAgentUserResponse(data as msdyn_SalesAgent_GetAgentUserResult);
  }
}
