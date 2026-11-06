import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocflaggedspam } from "./types/index.js";

/**
 * Response from msdyn_SetAutoBlockedFlag action
 */
export interface msdyn_SetAutoBlockedFlagResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SetAutoBlockedFlag action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetAutoBlockedFlagActionParameters {
  FlaggedSpamEntity: EntityReference | EntityPayload<msdyn_ocflaggedspam>;
}

/**
 * msdyn_SetAutoBlockedFlag action
 *
 * Unbound action
 */
export class msdyn_SetAutoBlockedFlagAction implements Executable<msdyn_SetAutoBlockedFlagResponse> {
  constructor(public readonly parameters: msdyn_SetAutoBlockedFlagActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetAutoBlockedFlag`;

    const body = requestBody({
      FlaggedSpamEntity: this.parameters.FlaggedSpamEntity,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SetAutoBlockedFlagResponse;
    return (await response.json()) as msdyn_SetAutoBlockedFlagResponse;
  }
}
