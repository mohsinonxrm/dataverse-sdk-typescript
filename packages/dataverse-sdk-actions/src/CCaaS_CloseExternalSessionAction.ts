import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_CloseExternalSession action
 */
export interface CCaaS_CloseExternalSessionResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_CloseExternalSession action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CloseExternalSessionActionParameters {
  ParticipantType: string;
  ApiVersion: string;
  CommandContext?: string;
  ParticipantId: string;
  CallId?: string;
  SessionId: string;
}

/**
 * CCaaS_CloseExternalSession action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_CloseExternalSessionAction implements Executable<CCaaS_CloseExternalSessionResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_CloseExternalSessionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_CloseExternalSession`;

    const body = requestBody({
      ParticipantType: this.parameters.ParticipantType,
      ApiVersion: this.parameters.ApiVersion,
      CommandContext: this.parameters.CommandContext,
      ParticipantId: this.parameters.ParticipantId,
      CallId: this.parameters.CallId,
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

  async parseResponse(response: Response): Promise<CCaaS_CloseExternalSessionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_CloseExternalSessionResponse;
    return (await response.json()) as CCaaS_CloseExternalSessionResponse;
  }
}
