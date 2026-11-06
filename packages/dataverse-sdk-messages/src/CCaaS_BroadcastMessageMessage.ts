import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_BroadcastMessageResponse as CCaaS_BroadcastMessageResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_BroadcastMessage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BroadcastMessageRequestParameters {
  Message: string;
  Title: string;
  ApiVersion: string;
  ConversationIds: string[];
}

/**
 * CCaaS_BroadcastMessage request message
 *
 * Web API Action: CCaaS_BroadcastMessage
 */
export class CCaaS_BroadcastMessageRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BroadcastMessageResponse>
{
  declare readonly Parameters: Readonly<CCaaS_BroadcastMessageRequestParameters>;

  constructor(parameters: CCaaS_BroadcastMessageRequestParameters) {
    super("CCaaS_BroadcastMessage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BroadcastMessage`;

    const body = requestBody({
      Message: this.Parameters.Message,
      Title: this.Parameters.Title,
      ApiVersion: this.Parameters.ApiVersion,
      ConversationIds: this.Parameters.ConversationIds,
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

  async parseResponse(response: Response): Promise<CCaaS_BroadcastMessageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_BroadcastMessageResponse.fromResponse({});
    return CCaaS_BroadcastMessageResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_BroadcastMessage response message
 */
export class CCaaS_BroadcastMessageResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BroadcastMessageResponseData) {
    super("CCaaS_BroadcastMessage");
  }

  static fromResponse(data: unknown): CCaaS_BroadcastMessageResponse {
    return new CCaaS_BroadcastMessageResponse(
      responseObject<CCaaS_BroadcastMessageResponseData>(data)
    );
  }
}
