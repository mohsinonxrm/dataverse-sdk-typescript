import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetSwarmInvitationCard action
 */
export interface msdyn_GetSwarmInvitationCardResponse {
  msdyn_SwarmInvitationResponse: string;
  msdyn_SwarmCardRecipient: string;
  msdyn_SwarmInvitationCardJson: string;
}

/**
 * msdyn_GetSwarmInvitationCard action
 *
 * Unbound action
 */
export class msdyn_GetSwarmInvitationCardAction implements Executable<msdyn_GetSwarmInvitationCardResponse> {
  constructor(public readonly msdyn_SwarmParticipant: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmInvitationCard`;

    const body: Record<string, unknown> = {
      msdyn_SwarmParticipant: this.msdyn_SwarmParticipant,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmInvitationCardResponse> {
    const data = await response.json();
    return data as msdyn_GetSwarmInvitationCardResponse;
  }
}
