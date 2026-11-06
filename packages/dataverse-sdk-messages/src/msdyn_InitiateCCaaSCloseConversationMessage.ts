import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InitiateCCaaSCloseConversationResponse as msdyn_InitiateCCaaSCloseConversationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InitiateCCaaSCloseConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSCloseConversationRequestParameters {
  SessionId: string;
  InitiatingUser: string;
  LiveWorkItemId: string;
}

/**
 * msdyn_InitiateCCaaSCloseConversation request message
 *
 * Web API Action: msdyn_InitiateCCaaSCloseConversation
 */
export class msdyn_InitiateCCaaSCloseConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSCloseConversationResponse>
{
  declare readonly Parameters: Readonly<msdyn_InitiateCCaaSCloseConversationRequestParameters>;

  constructor(parameters: msdyn_InitiateCCaaSCloseConversationRequestParameters) {
    super("msdyn_InitiateCCaaSCloseConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSCloseConversation`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      InitiatingUser: this.Parameters.InitiatingUser,
      LiveWorkItemId: this.Parameters.LiveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSCloseConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_InitiateCCaaSCloseConversationResponse.fromResponse(text ? JSON.parse(text) : {});
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
