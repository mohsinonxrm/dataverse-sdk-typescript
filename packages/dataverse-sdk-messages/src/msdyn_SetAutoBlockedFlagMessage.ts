import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_ocflaggedspam } from "./types/index.js";

/**
 * msdyn_SetAutoBlockedFlag request message
 *
 * Web API Action: msdyn_SetAutoBlockedFlag
 */
export class msdyn_SetAutoBlockedFlagRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetAutoBlockedFlagResponse>
{
  constructor(public flaggedSpamEntity: msdyn_ocflaggedspam) {
    super("msdyn_SetAutoBlockedFlag");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetAutoBlockedFlag`;

    const body: Record<string, unknown> = {
      FlaggedSpamEntity: this.flaggedSpamEntity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SetAutoBlockedFlagResponse> {
    // No return value (204 No Content)
    return new msdyn_SetAutoBlockedFlagResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FlaggedSpamEntity: this.flaggedSpamEntity,
    };
  }
}

/**
 * msdyn_SetAutoBlockedFlag response message
 */
export class msdyn_SetAutoBlockedFlagResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SetAutoBlockedFlag");
  }

  static fromResponse(_data: unknown): msdyn_SetAutoBlockedFlagResponse {
    return new msdyn_SetAutoBlockedFlagResponse();
  }
}
