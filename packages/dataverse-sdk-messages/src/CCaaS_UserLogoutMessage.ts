import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_UserLogoutResponse as CCaaS_UserLogoutResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_UserLogout message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_UserLogoutRequestParameters {
  ApiVersion: string;
  LogoutSource: number;
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
      ApiVersion: this.Parameters.ApiVersion,
      LogoutSource: this.Parameters.LogoutSource,
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
    if (response.status === 204) return CCaaS_UserLogoutResponse.fromResponse({});
    return CCaaS_UserLogoutResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_UserLogout response message
 */
export class CCaaS_UserLogoutResponse extends OrganizationResponse {
  constructor(public result: CCaaS_UserLogoutResponseData) {
    super("CCaaS_UserLogout");
  }

  static fromResponse(data: unknown): CCaaS_UserLogoutResponse {
    return new CCaaS_UserLogoutResponse(responseObject<CCaaS_UserLogoutResponseData>(data));
  }
}
