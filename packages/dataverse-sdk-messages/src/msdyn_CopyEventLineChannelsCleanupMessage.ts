import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventLineChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventLineChannelsCleanup
 */
export class msdyn_CopyEventLineChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventLineChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventLineChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventLineChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventLineChannelsCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventLineChannelsCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CopyEventLineChannelsCleanup response message
 */
export class msdyn_CopyEventLineChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventLineChannelsCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventLineChannelsCleanupResponse {
    return new msdyn_CopyEventLineChannelsCleanupResponse();
  }
}
