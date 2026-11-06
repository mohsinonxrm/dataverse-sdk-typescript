import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InitiateCCaaSCloseConversation action
 */
export interface msdyn_InitiateCCaaSCloseConversationResponse {
  msdyn_InitiateCCaaSCloseConversationAPIResponse: string;
}

/**
 * Parameters of the msdyn_InitiateCCaaSCloseConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSCloseConversationActionParameters {
  SessionId: string;
  LiveWorkItemId: string;
  InitiatingUser: string;
}

/**
 * msdyn_InitiateCCaaSCloseConversation action
 *
 * Unbound action
 */
export class msdyn_InitiateCCaaSCloseConversationAction implements Executable<msdyn_InitiateCCaaSCloseConversationResponse> {
  constructor(public readonly parameters: msdyn_InitiateCCaaSCloseConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSCloseConversation`;

    const body = requestBody({
      SessionId: this.parameters.SessionId,
      LiveWorkItemId: this.parameters.LiveWorkItemId,
      InitiatingUser: this.parameters.InitiatingUser,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSCloseConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InitiateCCaaSCloseConversationResponse;
    return (await response.json()) as msdyn_InitiateCCaaSCloseConversationResponse;
  }
}
