import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_EndPhoneCall action
 */
export interface CCaaS_EndPhoneCallResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_EndPhoneCall action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndPhoneCallActionParameters {
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_EndPhoneCall action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndPhoneCallAction implements Executable<CCaaS_EndPhoneCallResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_EndPhoneCallActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndPhoneCall`;

    const body = requestBody({
      SessionId: this.parameters.SessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_EndPhoneCallResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_EndPhoneCallResponse;
    return (await response.json()) as CCaaS_EndPhoneCallResponse;
  }
}
