import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventSMSChannelsCleanup request message
 *
 * Web API Action: msdyn_CopyEventSMSChannelsCleanup
 */
export class msdyn_CopyEventSMSChannelsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventSMSChannelsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventSMSChannelsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventSMSChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventSMSChannelsCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventSMSChannelsCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CopyEventSMSChannelsCleanup response message
 */
export class msdyn_CopyEventSMSChannelsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventSMSChannelsCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventSMSChannelsCleanupResponse {
    return new msdyn_CopyEventSMSChannelsCleanupResponse();
  }
}
