import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_OneTimePasswordSend action
 */
export interface CCaaS_OneTimePasswordSendResponse {
  ResponseData: string;
}

/**
 * Parameters of the CCaaS_OneTimePasswordSend action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_OneTimePasswordSendActionParameters {
  ApiVersion: string;
  CustomerUniqueId: string;
  CallId?: string;
}

/**
 * CCaaS_OneTimePasswordSend action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_OneTimePasswordSendAction implements Executable<CCaaS_OneTimePasswordSendResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_OneTimePasswordSendActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_OneTimePasswordSend`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      CustomerUniqueId: this.parameters.CustomerUniqueId,
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

  async parseResponse(response: Response): Promise<CCaaS_OneTimePasswordSendResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_OneTimePasswordSendResponse;
    return (await response.json()) as CCaaS_OneTimePasswordSendResponse;
  }
}
