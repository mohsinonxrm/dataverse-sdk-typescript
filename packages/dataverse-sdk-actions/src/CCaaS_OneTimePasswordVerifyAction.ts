import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_OneTimePasswordVerify action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_OneTimePasswordVerifyResponse {
  "@odata.context"?: string;
  ResponseData: string;
}

/**
 * Parameters of the CCaaS_OneTimePasswordVerify action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_OneTimePasswordVerifyActionParameters {
  OTPCode: string;
  CustomerUniqueId: string;
  ApiVersion: string;
  CallId?: string;
}

/**
 * CCaaS_OneTimePasswordVerify action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_OneTimePasswordVerifyAction implements Executable<CCaaS_OneTimePasswordVerifyResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_OneTimePasswordVerifyActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_OneTimePasswordVerify`;

    const body = requestBody({
      OTPCode: this.parameters.OTPCode,
      CustomerUniqueId: this.parameters.CustomerUniqueId,
      ApiVersion: this.parameters.ApiVersion,
      CallId: this.parameters.CallId,
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
    return (await response.json()) as CCaaS_OneTimePasswordVerifyResponse;
  }
}
