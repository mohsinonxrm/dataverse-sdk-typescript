import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventFacebookChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventFacebookChannelsCleanup
 */
export class msdyn_CopyEventFacebookChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventFacebookChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventFacebookChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventFacebookChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventFacebookChannelsCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventFacebookChannelsCleanupResponse();
  }
}

/**
 * msdyn_CopyEventFacebookChannelsCleanup response message
 */
export class msdyn_CopyEventFacebookChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventFacebookChannelsCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventFacebookChannelsCleanupResponse {
    return new msdyn_CopyEventFacebookChannelsCleanupResponse();
  }
}
