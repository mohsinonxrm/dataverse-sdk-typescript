import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InitiateCCaaSPickConversationResponse as msdyn_InitiateCCaaSPickConversationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InitiateCCaaSPickConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSPickConversationRequestParameters {
  LiveWorkItemId: string;
  InitiatingUser: string;
}

/**
 * msdyn_InitiateCCaaSPickConversation request message
 *
 * Web API Action: msdyn_InitiateCCaaSPickConversation
 */
export class msdyn_InitiateCCaaSPickConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSPickConversationResponse>
{
  declare readonly Parameters: Readonly<msdyn_InitiateCCaaSPickConversationRequestParameters>;

  constructor(parameters: msdyn_InitiateCCaaSPickConversationRequestParameters) {
    super("msdyn_InitiateCCaaSPickConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSPickConversation`;

    const body = requestBody({
      LiveWorkItemId: this.Parameters.LiveWorkItemId,
      InitiatingUser: this.Parameters.InitiatingUser,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSPickConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_InitiateCCaaSPickConversationResponse.fromResponse(text ? JSON.parse(text) : {});
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
