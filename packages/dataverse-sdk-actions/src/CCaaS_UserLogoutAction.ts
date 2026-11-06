import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_UserLogout action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_UserLogoutResponse {
  "@odata.context"?: string;
  Message: string;
}

/**
 * Parameters of the CCaaS_UserLogout action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_UserLogoutActionParameters {
  LogoutSource: number;
  ApiVersion: string;
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
      LogoutSource: this.parameters.LogoutSource,
      ApiVersion: this.parameters.ApiVersion,
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
    return (await response.json()) as CCaaS_UserLogoutResponse;
  }
}
