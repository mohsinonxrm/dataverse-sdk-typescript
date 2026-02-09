import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_UserLogout action
 */
export interface CCaaS_UserLogoutResponse {
  Message: string;
}

/**
 * CCaaS_UserLogout action
 *
 * Unbound action
 */
export class CCaaS_UserLogoutAction implements Executable<CCaaS_UserLogoutResponse> {
  constructor(
    public readonly apiVersion: string,
    public readonly logoutSource: number
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_UserLogoutResponse> {
    const data = await response.json();
    return data as CCaaS_UserLogoutResponse;
  }
}
