import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventWechatChannelCleanup request message
 *
 * Web API Action: msdyn_CopyEventWechatChannelCleanup
 */
export class msdyn_CopyEventWechatChannelCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventWechatChannelCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventWechatChannelCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventWechatChannelCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventWechatChannelCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventWechatChannelCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CopyEventWechatChannelCleanup response message
 */
export class msdyn_CopyEventWechatChannelCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventWechatChannelCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventWechatChannelCleanupResponse {
    return new msdyn_CopyEventWechatChannelCleanupResponse();
  }
}
