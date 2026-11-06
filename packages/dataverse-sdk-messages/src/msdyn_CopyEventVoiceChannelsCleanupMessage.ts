import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventVoiceChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventVoiceChannelsCleanup
 */
export class msdyn_CopyEventVoiceChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventVoiceChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventVoiceChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventVoiceChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_CopyEventVoiceChannelsCleanupResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CopyEventVoiceChannelsCleanupResponse());
  }
}

/**
 * msdyn_CopyEventVoiceChannelsCleanup response message
 */
export class msdyn_CopyEventVoiceChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventVoiceChannelsCleanup");
  }

  static fromResponse(_data?: unknown): msdyn_CopyEventVoiceChannelsCleanupResponse {
    return new msdyn_CopyEventVoiceChannelsCleanupResponse();
  }
}
