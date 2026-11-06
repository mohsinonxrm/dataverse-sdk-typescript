import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetSwarmResponseCard action
 */
export interface msdyn_GetSwarmResponseCardResponse {
  msdyn_SwarmResponseCardRecipient: string;
  msdyn_SwarmResponseCardJson: string;
}

/**
 * msdyn_GetSwarmResponseCard action
 *
 * Unbound action
 */
export class msdyn_GetSwarmResponseCardAction implements Executable<msdyn_GetSwarmResponseCardResponse> {
  constructor(public readonly msdyn_SwarmParticipant: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmResponseCard`;

    const body: Record<string, unknown> = {
      msdyn_SwarmParticipant: this.msdyn_SwarmParticipant,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmResponseCardResponse> {
    const data = await response.json();
    return data as msdyn_GetSwarmResponseCardResponse;
  }
}
