import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetSwarmResponseCard action
 */
export interface msdyn_GetSwarmResponseCardResponse {
  msdyn_SwarmResponseCardRecipient: string;
  msdyn_SwarmResponseCardJson: string;
}

/**
 * Parameters of the msdyn_GetSwarmResponseCard action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmResponseCardActionParameters {
  msdyn_SwarmParticipant: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetSwarmResponseCard action
 *
 * Unbound action
 */
export class msdyn_GetSwarmResponseCardAction implements Executable<msdyn_GetSwarmResponseCardResponse> {
  constructor(public readonly parameters: msdyn_GetSwarmResponseCardActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmResponseCard`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmResponseCardResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetSwarmResponseCardResponse;
    return (await response.json()) as msdyn_GetSwarmResponseCardResponse;
  }
}
