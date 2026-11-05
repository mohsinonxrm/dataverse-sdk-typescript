import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_InitiateCCaaSPickConversationResponse as msdyn_InitiateCCaaSPickConversationResponseData } from "./types/index.js";

/**
 * msdyn_InitiateCCaaSPickConversation request message
 *
 * Web API Action: msdyn_InitiateCCaaSPickConversation
 */
export class msdyn_InitiateCCaaSPickConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSPickConversationResponse>
{
  constructor(
    public liveWorkItemId: string,
    public initiatingUser: string
  ) {
    super("msdyn_InitiateCCaaSPickConversation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSPickConversation`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
      InitiatingUser: this.initiatingUser,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSPickConversationResponse> {
    const data = await response.json();
    return msdyn_InitiateCCaaSPickConversationResponse.fromResponse(data);
  }
}

/**
 * msdyn_InitiateCCaaSPickConversation response message
 */
export class msdyn_InitiateCCaaSPickConversationResponse extends OrganizationResponse {
  constructor(public result: msdyn_InitiateCCaaSPickConversationResponseData) {
    super("msdyn_InitiateCCaaSPickConversation");
  }

  static fromResponse(data: unknown): msdyn_InitiateCCaaSPickConversationResponse {
    return new msdyn_InitiateCCaaSPickConversationResponse(
      responseObject<msdyn_InitiateCCaaSPickConversationResponseData>(data)
    );
  }
}
