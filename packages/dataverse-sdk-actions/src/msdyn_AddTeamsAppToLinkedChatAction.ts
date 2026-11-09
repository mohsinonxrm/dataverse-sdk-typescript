import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AddTeamsAppToLinkedChat action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AddTeamsAppToLinkedChatResponse = void;

/**
 * Parameters of the msdyn_AddTeamsAppToLinkedChat action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddTeamsAppToLinkedChatActionParameters {
  msdyn_TeamsChatAssociationId: string;
}

/**
 * msdyn_AddTeamsAppToLinkedChat action
 *
 * Unbound action
 */
export class msdyn_AddTeamsAppToLinkedChatAction implements Executable<msdyn_AddTeamsAppToLinkedChatResponse> {
  constructor(public readonly parameters: msdyn_AddTeamsAppToLinkedChatActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddTeamsAppToLinkedChat`;

    const body = requestBody({
      msdyn_TeamsChatAssociationId: this.parameters.msdyn_TeamsChatAssociationId,
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

  parseResponse(_response: Response): Promise<msdyn_AddTeamsAppToLinkedChatResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
