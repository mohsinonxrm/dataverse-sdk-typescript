import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_EndCall action
 */
export interface CCaaS_EndCallResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_EndCall action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndCallActionParameters {
  ForEveryone?: boolean;
  SessionId: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_EndCall action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndCallAction implements Executable<CCaaS_EndCallResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_EndCallActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndCall`;

    const body = requestBody({
      ForEveryone: this.parameters.ForEveryone,
      SessionId: this.parameters.SessionId,
      CallId: this.parameters.CallId,
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

  async parseResponse(response: Response): Promise<CCaaS_EndCallResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_EndCallResponse;
    return (await response.json()) as CCaaS_EndCallResponse;
  }
}
