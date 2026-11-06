import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from JoinLinkedChat action
 */
export interface JoinLinkedChatResponse {
  // No content returned
}

/**
 * Parameters of the JoinLinkedChat action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface JoinLinkedChatActionParameters {
  TeamsChatId: string;
  UserId: string;
  RegardingEntity: EntityReference | AnyEntityPayload;
}

/**
 * JoinLinkedChat action
 *
 * Unbound action
 */
export class JoinLinkedChatAction implements Executable<JoinLinkedChatResponse> {
  constructor(public readonly parameters: JoinLinkedChatActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/JoinLinkedChat`;

    const body = requestBody({
      TeamsChatId: this.parameters.TeamsChatId,
      UserId: this.parameters.UserId,
      RegardingEntity: this.parameters.RegardingEntity,
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

  async parseResponse(response: Response): Promise<JoinLinkedChatResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as JoinLinkedChatResponse;
    return (await response.json()) as JoinLinkedChatResponse;
  }
}
