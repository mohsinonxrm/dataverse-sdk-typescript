import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_InitiateCCaaSCloseConversationResponse as msdyn_InitiateCCaaSCloseConversationResponseData } from "./types/index.js";

/**
 * msdyn_InitiateCCaaSCloseConversation request message
 *
 * Web API Action: msdyn_InitiateCCaaSCloseConversation
 */
export class msdyn_InitiateCCaaSCloseConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSCloseConversationResponse>
{
  constructor(
    public sessionId: string,
    public initiatingUser: string,
    public liveWorkItemId: string
  ) {
    super("msdyn_InitiateCCaaSCloseConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSCloseConversation`;

    const body: Record<string, unknown> = {
      SessionId: this.sessionId,
      InitiatingUser: this.initiatingUser,
      LiveWorkItemId: this.liveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSCloseConversationResponse> {
    const data = await response.json();
    return msdyn_InitiateCCaaSCloseConversationResponse.fromResponse(data);
  }
}

/**
 * msdyn_InitiateCCaaSCloseConversation response message
 */
export class msdyn_InitiateCCaaSCloseConversationResponse extends OrganizationResponse {
  constructor(public result: msdyn_InitiateCCaaSCloseConversationResponseData) {
    super("msdyn_InitiateCCaaSCloseConversation");
  }

  static fromResponse(data: unknown): msdyn_InitiateCCaaSCloseConversationResponse {
    return new msdyn_InitiateCCaaSCloseConversationResponse(
      responseObject<msdyn_InitiateCCaaSCloseConversationResponseData>(data)
    );
  }
}
