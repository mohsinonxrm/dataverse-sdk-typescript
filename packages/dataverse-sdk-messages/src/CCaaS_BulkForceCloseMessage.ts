import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_BulkForceClose request message
 *
 * Web API Action: CCaaS_BulkForceClose
 */
export class CCaaS_BulkForceCloseRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BulkForceCloseResponse>
{
  constructor(
    public conversationIds: string[],
    public apiVersion: string
  ) {
    super("CCaaS_BulkForceClose");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkForceClose`;

    const body: Record<string, unknown> = {
      ConversationIds: this.conversationIds,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_BulkForceCloseResponse> {
    const data = await response.json();
    return CCaaS_BulkForceCloseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ConversationIds: this.conversationIds,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_BulkForceClose response message
 */
export class CCaaS_BulkForceCloseResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BulkForceCloseResponse) {
    super("CCaaS_BulkForceClose");
  }

  static fromResponse(data: unknown): CCaaS_BulkForceCloseResponse {
    return new CCaaS_BulkForceCloseResponse((data as any).value);
  }
}
