import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetContactsFromAssociatedConversations action
 */
export interface msdyn_GetContactsFromAssociatedConversationsResponse {
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsFromAssociatedConversations action
 *
 * Unbound action
 */
export class msdyn_GetContactsFromAssociatedConversationsAction implements Executable<msdyn_GetContactsFromAssociatedConversationsResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string,
    public readonly customActionInputs: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsFromAssociatedConversations`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      CustomActionInputs: this.customActionInputs,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetContactsFromAssociatedConversationsResponse> {
    const data = await response.json();
    return data as msdyn_GetContactsFromAssociatedConversationsResponse;
  }
}
