import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetSwarmSkills action
 */
export interface msdyn_GetSwarmSkillsResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetSwarmSkills action
 *
 * Unbound action
 */
export class msdyn_GetSwarmSkillsAction implements Executable<msdyn_GetSwarmSkillsResponse> {
  constructor(public readonly swarmObject: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmSkills`;

    const body: Record<string, unknown> = {
      SwarmObject: this.swarmObject,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmSkillsResponse> {
    const data = await response.json();
    return data as msdyn_GetSwarmSkillsResponse;
  }
}
