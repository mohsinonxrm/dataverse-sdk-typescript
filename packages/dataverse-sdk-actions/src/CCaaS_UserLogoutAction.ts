import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_UserLogout action
 */
export interface CCaaS_UserLogoutResponse {
  Message: string;
}

/**
 * Parameters of the CCaaS_UserLogout action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_UserLogoutActionParameters {
  ApiVersion: string;
  LogoutSource: number;
}

/**
 * CCaaS_UserLogout action
 *
 * Unbound action
 */
export class CCaaS_UserLogoutAction implements Executable<CCaaS_UserLogoutResponse> {
  constructor(public readonly parameters: CCaaS_UserLogoutActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_UserLogout`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      LogoutSource: this.parameters.LogoutSource,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_UserLogoutResponse;
    return (await response.json()) as CCaaS_UserLogoutResponse;
  }
}
