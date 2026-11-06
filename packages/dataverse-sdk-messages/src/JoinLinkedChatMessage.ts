import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the JoinLinkedChat message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface JoinLinkedChatRequestParameters {
  TeamsChatId: string;
  UserId: string;
  RegardingEntity: EntityReference | AnyEntityPayload;
}

/**
 * JoinLinkedChat request message
 *
 * Web API Action: JoinLinkedChat
 */
export class JoinLinkedChatRequest
  extends OrganizationRequest
  implements Executable<JoinLinkedChatResponse>
{
  declare readonly Parameters: Readonly<JoinLinkedChatRequestParameters>;

  constructor(parameters: JoinLinkedChatRequestParameters) {
    super("JoinLinkedChat", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/JoinLinkedChat`;

    const body = requestBody({
      TeamsChatId: this.Parameters.TeamsChatId,
      UserId: this.Parameters.UserId,
      RegardingEntity: this.Parameters.RegardingEntity,
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
    // No return value (204 No Content)
    return new JoinLinkedChatResponse();
  }
}

/**
 * JoinLinkedChat response message
 */
export class JoinLinkedChatResponse extends OrganizationResponse {
  constructor() {
    super("JoinLinkedChat");
  }

  static fromResponse(_data: unknown): JoinLinkedChatResponse {
    return new JoinLinkedChatResponse();
  }
}
