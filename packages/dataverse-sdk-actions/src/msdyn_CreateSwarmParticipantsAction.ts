import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateSwarmParticipants action
 */
export interface msdyn_CreateSwarmParticipantsResponse {
  // No content returned
}

/**
 * msdyn_CreateSwarmParticipants action
 *
 * Unbound action
 */
export class msdyn_CreateSwarmParticipantsAction implements Executable<msdyn_CreateSwarmParticipantsResponse> {
  constructor(public readonly swarmEntityReference: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSwarmParticipants`;

    const body: Record<string, unknown> = {
      SwarmEntityReference: this.swarmEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSwarmParticipantsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
