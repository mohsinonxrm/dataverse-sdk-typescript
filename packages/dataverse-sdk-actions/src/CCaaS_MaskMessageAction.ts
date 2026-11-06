import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_MaskMessage action
 */
export interface CCaaS_MaskMessageResponse {
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_MaskMessage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_MaskMessageActionParameters {
  ConversationId: string;
  WidgetId: string;
  MessageId: string;
  ApiVersion: string;
}

/**
 * CCaaS_MaskMessage action
 *
 * Unbound action
 */
export class CCaaS_MaskMessageAction implements Executable<CCaaS_MaskMessageResponse> {
  constructor(public readonly parameters: CCaaS_MaskMessageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_MaskMessage`;

    const body = requestBody({
      ConversationId: this.parameters.ConversationId,
      WidgetId: this.parameters.WidgetId,
      MessageId: this.parameters.MessageId,
      ApiVersion: this.parameters.ApiVersion,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_MaskMessageResponse;
    return (await response.json()) as CCaaS_MaskMessageResponse;
  }
}
