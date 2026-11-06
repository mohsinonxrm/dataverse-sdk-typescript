import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetContactsFromAssociatedConversations action
 */
export interface msdyn_GetContactsFromAssociatedConversationsResponse {
  CustomActionSuggestedUsers: string;
}

/**
 * Parameters of the msdyn_GetContactsFromAssociatedConversations action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsFromAssociatedConversationsActionParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsFromAssociatedConversations action
 *
 * Unbound action
 */
export class msdyn_GetContactsFromAssociatedConversationsAction implements Executable<msdyn_GetContactsFromAssociatedConversationsResponse> {
  constructor(
    public readonly parameters: msdyn_GetContactsFromAssociatedConversationsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsFromAssociatedConversations`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
      RecordId: this.parameters.RecordId,
      CustomActionInputs: this.parameters.CustomActionInputs,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetContactsFromAssociatedConversationsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetContactsFromAssociatedConversationsResponse;
  }
}
