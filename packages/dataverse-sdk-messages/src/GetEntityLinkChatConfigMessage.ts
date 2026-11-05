import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";

/**
 * GetEntityLinkChatConfig request message
 *
 * Web API Action: GetEntityLinkChatConfig
 */
export class GetEntityLinkChatConfigRequest
  extends OrganizationRequest
  implements Executable<GetEntityLinkChatConfigResponse>
{
  constructor(public regardingEntityName: string) {
    super("GetEntityLinkChatConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntityLinkChatConfig`;

    const body: Record<string, unknown> = {
      RegardingEntityName: this.regardingEntityName,
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

  async parseResponse(response: Response): Promise<GetEntityLinkChatConfigResponse> {
    const data = await response.json();
    return GetEntityLinkChatConfigResponse.fromResponse(data);
  }
}

/**
 * GetEntityLinkChatConfig response message
 */
export class GetEntityLinkChatConfigResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("GetEntityLinkChatConfig");
  }

  static fromResponse(data: unknown): GetEntityLinkChatConfigResponse {
    return new GetEntityLinkChatConfigResponse(responseObject<Record<string, unknown>>(data));
  }
}
