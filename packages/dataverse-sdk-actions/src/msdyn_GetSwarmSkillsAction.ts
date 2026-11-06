import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetSwarmSkills action
 */
export interface msdyn_GetSwarmSkillsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetSwarmSkills action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmSkillsActionParameters {
  SwarmObject: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetSwarmSkills action
 *
 * Unbound action
 */
export class msdyn_GetSwarmSkillsAction implements Executable<msdyn_GetSwarmSkillsResponse> {
  constructor(public readonly parameters: msdyn_GetSwarmSkillsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmSkills`;

    const body = requestBody({
      SwarmObject: this.parameters.SwarmObject,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmSkillsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSwarmSkillsResponse;
  }
}
