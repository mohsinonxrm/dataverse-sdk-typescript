import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CopyEventBotRegistrationsCleanup request message
 *
 * Web API Action: msdyn_CopyEventBotRegistrationsCleanup
 */
export class msdyn_CopyEventBotRegistrationsCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEventBotRegistrationsCleanupResponse>
{
  constructor() {
    super("msdyn_CopyEventBotRegistrationsCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventBotRegistrationsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventBotRegistrationsCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_CopyEventBotRegistrationsCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CopyEventBotRegistrationsCleanup response message
 */
export class msdyn_CopyEventBotRegistrationsCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CopyEventBotRegistrationsCleanup");
  }

  static fromResponse(_data: unknown): msdyn_CopyEventBotRegistrationsCleanupResponse {
    return new msdyn_CopyEventBotRegistrationsCleanupResponse();
  }
}
