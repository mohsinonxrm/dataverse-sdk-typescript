import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_OneTimePasswordVerifyResponse as CCaaS_OneTimePasswordVerifyResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_OneTimePasswordVerify message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_OneTimePasswordVerifyRequestParameters {
  OTPCode: string;
  CustomerUniqueId: string;
  ApiVersion: string;
  CallId?: string;
}

/**
 * CCaaS_OneTimePasswordVerify request message
 *
 * Web API Action: CCaaS_OneTimePasswordVerify
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_OneTimePasswordVerifyRequest
  extends OrganizationRequest
  implements Executable<CCaaS_OneTimePasswordVerifyResponse>
{
  declare readonly Parameters: Readonly<CCaaS_OneTimePasswordVerifyRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_OneTimePasswordVerifyRequestParameters
  ) {
    super("CCaaS_OneTimePasswordVerify", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_OneTimePasswordVerify`;

    const body = requestBody({
      OTPCode: this.Parameters.OTPCode,
      CustomerUniqueId: this.Parameters.CustomerUniqueId,
      ApiVersion: this.Parameters.ApiVersion,
      CallId: this.Parameters.CallId,
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

  async parseResponse(response: Response): Promise<CCaaS_OneTimePasswordVerifyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_OneTimePasswordVerifyResponse.fromResponse({});
    return CCaaS_OneTimePasswordVerifyResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_OneTimePasswordVerify response message
 */
export class CCaaS_OneTimePasswordVerifyResponse extends OrganizationResponse {
  constructor(public result: CCaaS_OneTimePasswordVerifyResponseData) {
    super("CCaaS_OneTimePasswordVerify");
  }

  static fromResponse(data: unknown): CCaaS_OneTimePasswordVerifyResponse {
    return new CCaaS_OneTimePasswordVerifyResponse(
      responseObject<CCaaS_OneTimePasswordVerifyResponseData>(data)
    );
  }
}
