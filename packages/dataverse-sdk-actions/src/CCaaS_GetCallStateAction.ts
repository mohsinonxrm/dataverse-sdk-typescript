import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_GetCallState action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetCallStateResponse {
  "@odata.context"?: string;
  callId: string;
  conversationId: string;
  participants: string;
  recordingState: string;
  transcriptionState: string;
}

/**
 * Parameters of the CCaaS_GetCallState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetCallStateActionParameters {
  ApiVersion: string;
  CallId: string;
  CommandContext?: string;
  SessionId: string;
}

/**
 * CCaaS_GetCallState action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_GetCallStateAction implements Executable<CCaaS_GetCallStateResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_GetCallStateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GetCallState`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      CallId: this.parameters.CallId,
      CommandContext: this.parameters.CommandContext,
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

  async parseResponse(response: Response): Promise<CCaaS_GetCallStateResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetCallStateResponse;
  }
}
