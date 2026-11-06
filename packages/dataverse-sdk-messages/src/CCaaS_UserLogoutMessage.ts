import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_UserLogout message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_UserLogoutRequestParameters {
  LogoutSource: number;
  ApiVersion: string;
}

/**
 * CCaaS_UserLogout request message
 *
 * Web API Action: CCaaS_UserLogout
 */
export class CCaaS_UserLogoutRequest
  extends OrganizationRequest
  implements Executable<CCaaS_UserLogoutResponse>
{
  declare readonly Parameters: Readonly<CCaaS_UserLogoutRequestParameters>;

  constructor(parameters: CCaaS_UserLogoutRequestParameters) {
    super("CCaaS_UserLogout", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_UserLogout`;

    const body = requestBody({
      LogoutSource: this.Parameters.LogoutSource,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_UserLogoutResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_UserLogoutResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_UserLogout action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_UserLogoutResult {
  "@odata.context"?: string;
  Message: string;
}

/**
 * CCaaS_UserLogout response message
 *
 * `result` is the value the CCaaS_UserLogout action returns (see {@link CCaaS_UserLogoutResult}).
 */
export class CCaaS_UserLogoutResponse extends OrganizationResponse {
  constructor(public result: CCaaS_UserLogoutResult) {
    super("CCaaS_UserLogout");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_UserLogoutResponse {
    return new CCaaS_UserLogoutResponse(data as CCaaS_UserLogoutResult);
  }
}
