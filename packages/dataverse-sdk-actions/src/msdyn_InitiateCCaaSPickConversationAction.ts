import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InitiateCCaaSPickConversation action
 */
export interface msdyn_InitiateCCaaSPickConversationResponse {
  msdyn_InitiateCCaaSPickConversationAPIResponse: string;
}

/**
 * Parameters of the msdyn_InitiateCCaaSPickConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSPickConversationActionParameters {
  LiveWorkItemId: string;
  InitiatingUser: string;
}

/**
 * msdyn_InitiateCCaaSPickConversation action
 *
 * Unbound action
 */
export class msdyn_InitiateCCaaSPickConversationAction implements Executable<msdyn_InitiateCCaaSPickConversationResponse> {
  constructor(public readonly parameters: msdyn_InitiateCCaaSPickConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSPickConversation`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSPickConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_InitiateCCaaSPickConversationResponse;
  }
}
