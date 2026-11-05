import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_ocflaggedspam } from "./types/index.js";

/**
 * Response from msdyn_SetAutoBlockedFlag action
 */
export interface msdyn_SetAutoBlockedFlagResponse {
  // No content returned
}

/**
 * msdyn_SetAutoBlockedFlag action
 *
 * Unbound action
 */
export class msdyn_SetAutoBlockedFlagAction implements Executable<msdyn_SetAutoBlockedFlagResponse> {
  constructor(public readonly flaggedSpamEntity: msdyn_ocflaggedspam) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetAutoBlockedFlag`;

    const body: Record<string, unknown> = {
      FlaggedSpamEntity: this.flaggedSpamEntity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SetAutoBlockedFlagResponse> {
    // No return value (204 No Content)
    return {};
  }
}
