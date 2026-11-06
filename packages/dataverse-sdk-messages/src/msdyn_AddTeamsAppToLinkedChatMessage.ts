import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AddTeamsAppToLinkedChat message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddTeamsAppToLinkedChatRequestParameters {
  msdyn_TeamsChatAssociationId: string;
}

/**
 * msdyn_AddTeamsAppToLinkedChat request message
 *
 * Web API Action: msdyn_AddTeamsAppToLinkedChat
 */
export class msdyn_AddTeamsAppToLinkedChatRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddTeamsAppToLinkedChatResponse>
{
  declare readonly Parameters: Readonly<msdyn_AddTeamsAppToLinkedChatRequestParameters>;

  constructor(parameters: msdyn_AddTeamsAppToLinkedChatRequestParameters) {
    super("msdyn_AddTeamsAppToLinkedChat", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddTeamsAppToLinkedChat`;

    const body = requestBody({
      msdyn_TeamsChatAssociationId: this.Parameters.msdyn_TeamsChatAssociationId,
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

  async parseResponse(response: Response): Promise<msdyn_AddTeamsAppToLinkedChatResponse> {
    // No return value (204 No Content)
    return new msdyn_AddTeamsAppToLinkedChatResponse();
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
