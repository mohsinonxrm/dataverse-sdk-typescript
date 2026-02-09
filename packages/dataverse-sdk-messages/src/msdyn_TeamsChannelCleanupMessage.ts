import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TeamsChannelCleanup request message
 *
 * Web API Action: msdyn_TeamsChannelCleanup
 */
export class msdyn_TeamsChannelCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_TeamsChannelCleanupResponse>
{
  constructor() {
    super("msdyn_TeamsChannelCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TeamsChannelCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TeamsChannelCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_TeamsChannelCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TeamsChannelCleanup response message
 */
export class msdyn_TeamsChannelCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TeamsChannelCleanup");
  }

  static fromResponse(_data: unknown): msdyn_TeamsChannelCleanupResponse {
    return new msdyn_TeamsChannelCleanupResponse();
  }
}
