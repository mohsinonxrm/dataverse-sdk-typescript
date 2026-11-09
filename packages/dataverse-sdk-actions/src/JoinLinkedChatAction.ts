import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the JoinLinkedChat action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type JoinLinkedChatResponse = void;

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

  parseResponse(_response: Response): Promise<JoinLinkedChatResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
