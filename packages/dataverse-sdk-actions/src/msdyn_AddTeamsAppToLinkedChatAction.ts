import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AddTeamsAppToLinkedChat action
 */
export interface msdyn_AddTeamsAppToLinkedChatResponse {
  // No content returned
}

/**
 * msdyn_AddTeamsAppToLinkedChat action
 *
 * Unbound action
 */
export class msdyn_AddTeamsAppToLinkedChatAction implements Executable<msdyn_AddTeamsAppToLinkedChatResponse> {
  constructor(public readonly msdyn_TeamsChatAssociationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddTeamsAppToLinkedChat`;

    const body: Record<string, unknown> = {
      msdyn_TeamsChatAssociationId: this.msdyn_TeamsChatAssociationId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AddTeamsAppToLinkedChatResponse> {
    // No return value (204 No Content)
    return {};
  }
}
