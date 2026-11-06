import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CloseConversation action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_CloseConversationResponse = void;

/**
 * Parameters of the CCaaS_CloseConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CloseConversationActionParameters {
  AgentId: string;
  LiveworkitemId: string;
  ActivityStatusCode: string;
}

/**
 * CCaaS_CloseConversation action
 *
 * Unbound action
 */
export class CCaaS_CloseConversationAction implements Executable<CCaaS_CloseConversationResponse> {
  constructor(public readonly parameters: CCaaS_CloseConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CloseConversation`;

    const body = requestBody({
      AgentId: this.parameters.AgentId,
      LiveworkitemId: this.parameters.LiveworkitemId,
      ActivityStatusCode: this.parameters.ActivityStatusCode,
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

  parseResponse(_response: Response): Promise<CCaaS_CloseConversationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
