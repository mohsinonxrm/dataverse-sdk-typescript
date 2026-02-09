import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_MaskMessage action
 */
export interface CCaaS_MaskMessageResponse {
  ResponseBody: string;
}

/**
 * CCaaS_MaskMessage action
 *
 * Unbound action
 */
export class CCaaS_MaskMessageAction implements Executable<CCaaS_MaskMessageResponse> {
  constructor(
    public readonly widgetId: string,
    public readonly messageId: string,
    public readonly apiVersion: string,
    public readonly conversationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_MaskMessage`;

    const body: Record<string, unknown> = {
      WidgetId: this.widgetId,
      MessageId: this.messageId,
      ApiVersion: this.apiVersion,
      ConversationId: this.conversationId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_MaskMessageResponse> {
    const data = await response.json();
    return data as CCaaS_MaskMessageResponse;
  }
}
