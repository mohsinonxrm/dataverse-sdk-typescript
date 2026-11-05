import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AddTeamsAppToLinkedChat request message
 *
 * Web API Action: msdyn_AddTeamsAppToLinkedChat
 */
export class msdyn_AddTeamsAppToLinkedChatRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddTeamsAppToLinkedChatResponse>
{
  constructor(public msdyn_TeamsChatAssociationId: string) {
    super("msdyn_AddTeamsAppToLinkedChat");
  }

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
    return new msdyn_AddTeamsAppToLinkedChatResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TeamsChatAssociationId: this.msdyn_TeamsChatAssociationId,
    };
  }
}

/**
 * msdyn_AddTeamsAppToLinkedChat response message
 */
export class msdyn_AddTeamsAppToLinkedChatResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AddTeamsAppToLinkedChat");
  }

  static fromResponse(_data: unknown): msdyn_AddTeamsAppToLinkedChatResponse {
    return new msdyn_AddTeamsAppToLinkedChatResponse();
  }
}
