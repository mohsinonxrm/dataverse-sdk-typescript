import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_UserLogout request message
 *
 * Web API Action: CCaaS_UserLogout
 */
export class CCaaS_UserLogoutRequest
  extends OrganizationRequest
  implements Executable<CCaaS_UserLogoutResponse>
{
  constructor(
    public apiVersion: string,
    public logoutSource: number
  ) {
    super("CCaaS_UserLogout");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_UserLogout`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      LogoutSource: this.logoutSource,
    };

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
    const data = await response.json();
    return CCaaS_UserLogoutResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ApiVersion: this.apiVersion,
      LogoutSource: this.logoutSource,
    };
  }
}

/**
 * CCaaS_UserLogout response message
 */
export class CCaaS_UserLogoutResponse extends OrganizationResponse {
  constructor(public result: CCaaS_UserLogoutResponse) {
    super("CCaaS_UserLogout");
  }

  static fromResponse(data: unknown): CCaaS_UserLogoutResponse {
    return new CCaaS_UserLogoutResponse((data as any).value);
  }
}
