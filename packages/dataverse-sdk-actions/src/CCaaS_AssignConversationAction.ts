import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_AssignConversation action
 */
export interface CCaaS_AssignConversationResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_AssignConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AssignConversationActionParameters {
  ApiVersion: string;
  AgentId: string;
}

/**
 * CCaaS_AssignConversation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AssignConversationAction implements Executable<CCaaS_AssignConversationResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_AssignConversationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AssignConversation`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      AgentId: this.parameters.AgentId,
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

  async parseResponse(response: Response): Promise<CCaaS_AssignConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_AssignConversationResponse;
    return (await response.json()) as CCaaS_AssignConversationResponse;
  }
}
