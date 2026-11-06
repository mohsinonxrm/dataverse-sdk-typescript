import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_MaskMessage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_MaskMessageRequestParameters {
  ConversationId: string;
  WidgetId: string;
  MessageId: string;
  ApiVersion: string;
}

/**
 * CCaaS_MaskMessage request message
 *
 * Web API Action: CCaaS_MaskMessage
 */
export class CCaaS_MaskMessageRequest
  extends OrganizationRequest
  implements Executable<CCaaS_MaskMessageResponse>
{
  declare readonly Parameters: Readonly<CCaaS_MaskMessageRequestParameters>;

  constructor(parameters: CCaaS_MaskMessageRequestParameters) {
    super("CCaaS_MaskMessage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_MaskMessage`;

    const body = requestBody({
      ConversationId: this.Parameters.ConversationId,
      WidgetId: this.Parameters.WidgetId,
      MessageId: this.Parameters.MessageId,
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

  async parseResponse(response: Response): Promise<CCaaS_MaskMessageResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_MaskMessageResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_MaskMessage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_MaskMessageResult {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * CCaaS_MaskMessage response message
 *
 * `result` is the value the CCaaS_MaskMessage action returns (see {@link CCaaS_MaskMessageResult}).
 */
export class CCaaS_MaskMessageResponse extends OrganizationResponse {
  constructor(public result: CCaaS_MaskMessageResult) {
    super("CCaaS_MaskMessage");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_MaskMessageResponse {
    return new CCaaS_MaskMessageResponse(data as CCaaS_MaskMessageResult);
  }
}
