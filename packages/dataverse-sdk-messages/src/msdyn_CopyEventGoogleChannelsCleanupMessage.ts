import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventGoogleChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventGoogleChannelsCleanup
 */
export class msdyn_CopyEventGoogleChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventGoogleChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventGoogleChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventGoogleChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventGoogleChannelsCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventGoogleChannelsCleanupResponse();
  }
}

/**
 * msdyn_CopyEventGoogleChannelsCleanup response message
 */
export class msdyn_CopyEventGoogleChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventGoogleChannelsCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventGoogleChannelsCleanupResponse {
    return new msdyn_CopyEventGoogleChannelsCleanupResponse();
  }
}
