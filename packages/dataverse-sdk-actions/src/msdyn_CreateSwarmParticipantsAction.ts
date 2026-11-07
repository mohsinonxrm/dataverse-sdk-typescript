import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CreateSwarmParticipants action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CreateSwarmParticipantsResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CreateSwarmParticipantsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
