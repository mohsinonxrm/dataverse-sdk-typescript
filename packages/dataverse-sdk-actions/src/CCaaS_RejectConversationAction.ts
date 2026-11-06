import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_RejectConversation action
 */
export interface CCaaS_RejectConversationResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_RejectConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RejectConversationActionParameters {
  ApiVersion: string;
  SessionId: string;
  RejectReason?: string;
}

/**
 * CCaaS_RejectConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RejectConversationAction implements Executable<CCaaS_RejectConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_RejectConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejectConversation`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SessionId: this.parameters.SessionId,
      RejectReason: this.parameters.RejectReason,
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

  async parseResponse(response: Response): Promise<CCaaS_RejectConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_RejectConversationResponse;
    return (await response.json()) as CCaaS_RejectConversationResponse;
  }
}
