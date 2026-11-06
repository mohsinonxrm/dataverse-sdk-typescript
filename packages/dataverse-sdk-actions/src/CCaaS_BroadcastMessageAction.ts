import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_BroadcastMessage action
 */
export interface CCaaS_BroadcastMessageResponse {
  BulkActionId: string;
}

/**
 * Parameters of the CCaaS_BroadcastMessage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BroadcastMessageActionParameters {
  Message: string;
  Title: string;
  ApiVersion: string;
  ConversationIds: string[];
}

/**
 * CCaaS_BroadcastMessage action
 *
 * Unbound action
 */
export class CCaaS_BroadcastMessageAction implements Executable<CCaaS_BroadcastMessageResponse> {
  constructor(public readonly parameters: CCaaS_BroadcastMessageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BroadcastMessage`;

    const body = requestBody({
      Message: this.parameters.Message,
      Title: this.parameters.Title,
      ApiVersion: this.parameters.ApiVersion,
      ConversationIds: this.parameters.ConversationIds,
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

  async parseResponse(response: Response): Promise<CCaaS_BroadcastMessageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_BroadcastMessageResponse;
    return (await response.json()) as CCaaS_BroadcastMessageResponse;
  }
}
