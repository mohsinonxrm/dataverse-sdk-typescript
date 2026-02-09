import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventWhatsAppChannelCleanup request message
 *
 * Web API Action: msdyn_CopyEventWhatsAppChannelCleanup
 */
export class msdyn_CopyEventWhatsAppChannelCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventWhatsAppChannelCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventWhatsAppChannelCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventWhatsAppChannelCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventWhatsAppChannelCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventWhatsAppChannelCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CopyEventWhatsAppChannelCleanup response message
 */
export class msdyn_CopyEventWhatsAppChannelCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventWhatsAppChannelCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventWhatsAppChannelCleanupResponse {
    return new msdyn_CopyEventWhatsAppChannelCleanupResponse();
  }
}
