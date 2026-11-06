import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_BroadcastMessage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BroadcastMessageRequestParameters {
  Message: string;
  Title: string;
  ConversationIds: string[];
  ApiVersion: string;
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
      ConversationIds: this.Parameters.ConversationIds,
      ApiVersion: this.Parameters.ApiVersion,
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
    // The body is the complex value, with its @odata.context
    return CCaaS_BroadcastMessageResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_BroadcastMessage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_BroadcastMessageResult {
  "@odata.context"?: string;
  BulkActionId: string;
}

/**
 * CCaaS_BroadcastMessage response message
 *
 * `result` is the value the CCaaS_BroadcastMessage action returns (see {@link CCaaS_BroadcastMessageResult}).
 */
export class CCaaS_BroadcastMessageResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BroadcastMessageResult) {
    super("CCaaS_BroadcastMessage");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_BroadcastMessageResponse {
    return new CCaaS_BroadcastMessageResponse(data as CCaaS_BroadcastMessageResult);
  }
}
