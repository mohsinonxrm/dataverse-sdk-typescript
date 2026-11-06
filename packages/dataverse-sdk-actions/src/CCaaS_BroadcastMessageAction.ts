import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_BroadcastMessage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_BroadcastMessageResponse {
  "@odata.context"?: string;
  BulkActionId: string;
}

/**
 * Parameters of the CCaaS_BroadcastMessage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BroadcastMessageActionParameters {
  Message: string;
  Title: string;
  ConversationIds: string[];
  ApiVersion: string;
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
      ConversationIds: this.parameters.ConversationIds,
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

  async parseResponse(response: Response): Promise<CCaaS_BroadcastMessageResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_BroadcastMessageResponse;
  }
}
