import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_EndSession action
 */
export interface CCaaS_EndSessionResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_EndSession action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndSessionActionParameters {
  ApiVersion: string;
  SessionId?: string;
}

/**
 * CCaaS_EndSession action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndSessionAction implements Executable<CCaaS_EndSessionResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_EndSessionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndSession`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SessionId: this.parameters.SessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_EndSessionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_EndSessionResponse;
    return (await response.json()) as CCaaS_EndSessionResponse;
  }
}
