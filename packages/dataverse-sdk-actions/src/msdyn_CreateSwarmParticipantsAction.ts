import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CreateSwarmParticipants action
 */
export interface msdyn_CreateSwarmParticipantsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CreateSwarmParticipants action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSwarmParticipantsActionParameters {
  SwarmEntityReference: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateSwarmParticipants action
 *
 * Unbound action
 */
export class msdyn_CreateSwarmParticipantsAction implements Executable<msdyn_CreateSwarmParticipantsResponse> {
  constructor(public readonly parameters: msdyn_CreateSwarmParticipantsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSwarmParticipants`;

    const body = requestBody({
      SwarmEntityReference: this.parameters.SwarmEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSwarmParticipantsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateSwarmParticipantsResponse;
  }
}
