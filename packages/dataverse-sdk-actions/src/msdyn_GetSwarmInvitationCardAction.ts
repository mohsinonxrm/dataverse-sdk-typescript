import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_GetSwarmInvitationCard action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSwarmInvitationCardResponse {
  "@odata.context"?: string;
  msdyn_SwarmCardRecipient: string;
  msdyn_SwarmInvitationCardJson: string;
  msdyn_SwarmInvitationResponse: string;
}

/**
 * Parameters of the msdyn_GetSwarmInvitationCard action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmInvitationCardActionParameters {
  msdyn_SwarmParticipant: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetSwarmInvitationCard action
 *
 * Unbound action
 */
export class msdyn_GetSwarmInvitationCardAction implements Executable<msdyn_GetSwarmInvitationCardResponse> {
  constructor(public readonly parameters: msdyn_GetSwarmInvitationCardActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmInvitationCard`;

    const body = requestBody({
      msdyn_SwarmParticipant: this.parameters.msdyn_SwarmParticipant,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmInvitationCardResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSwarmInvitationCardResponse;
  }
}
