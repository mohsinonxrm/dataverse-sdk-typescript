import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_OneTimePasswordVerifyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_OneTimePasswordVerify action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_OneTimePasswordVerifyResult {
  "@odata.context"?: string;
  ResponseData: string;
}

/**
 * CCaaS_OneTimePasswordVerify response message
 *
 * `result` is the value the CCaaS_OneTimePasswordVerify action returns (see {@link CCaaS_OneTimePasswordVerifyResult}).
 */
export class CCaaS_OneTimePasswordVerifyResponse extends OrganizationResponse {
  constructor(public result: CCaaS_OneTimePasswordVerifyResult) {
    super("CCaaS_OneTimePasswordVerify");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_OneTimePasswordVerifyResponse {
    return new CCaaS_OneTimePasswordVerifyResponse(data as CCaaS_OneTimePasswordVerifyResult);
  }
}
