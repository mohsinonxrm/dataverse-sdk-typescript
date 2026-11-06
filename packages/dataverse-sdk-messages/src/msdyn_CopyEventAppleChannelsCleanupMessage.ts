import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventAppleChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventAppleChannelsCleanup
 */
export class msdyn_CopyEventAppleChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventAppleChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventAppleChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventAppleChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_CopyEventAppleChannelsCleanupResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CopyEventAppleChannelsCleanupResponse());
  }
}

/**
 * msdyn_CopyEventAppleChannelsCleanup response message
 */
export class msdyn_CopyEventAppleChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventAppleChannelsCleanup");
  }

  static fromResponse(_data?: unknown): msdyn_CopyEventAppleChannelsCleanupResponse {
    return new msdyn_CopyEventAppleChannelsCleanupResponse();
  }
}
