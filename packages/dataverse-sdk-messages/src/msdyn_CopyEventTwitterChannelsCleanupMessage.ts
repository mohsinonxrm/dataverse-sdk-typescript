import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventTwitterChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventTwitterChannelsCleanup
 */
export class msdyn_CopyEventTwitterChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventTwitterChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventTwitterChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventTwitterChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_CopyEventTwitterChannelsCleanupResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CopyEventTwitterChannelsCleanupResponse());
  }
}

/**
 * msdyn_CopyEventTwitterChannelsCleanup response message
 */
export class msdyn_CopyEventTwitterChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventTwitterChannelsCleanup");
  }

  static fromResponse(_data?: unknown): msdyn_CopyEventTwitterChannelsCleanupResponse {
    return new msdyn_CopyEventTwitterChannelsCleanupResponse();
  }
}
