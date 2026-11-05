import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventCustomChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventCustomChannelsCleanup
 */
export class msdyn_CopyEventCustomChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventCustomChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventCustomChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventCustomChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventCustomChannelsCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventCustomChannelsCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CopyEventCustomChannelsCleanup response message
 */
export class msdyn_CopyEventCustomChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventCustomChannelsCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventCustomChannelsCleanupResponse {
    return new msdyn_CopyEventCustomChannelsCleanupResponse();
  }
}
