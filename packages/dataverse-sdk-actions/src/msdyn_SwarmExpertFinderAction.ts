import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SwarmExpertFinder action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SwarmExpertFinderResponse = void;

/**
 * Parameters of the msdyn_SwarmExpertFinder action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SwarmExpertFinderActionParameters {
  SkillList: Record<string, unknown>[];
  SwarmId: string;
}

/**
 * msdyn_SwarmExpertFinder action
 *
 * Unbound action
 */
export class msdyn_SwarmExpertFinderAction implements Executable<msdyn_SwarmExpertFinderResponse> {
  constructor(public readonly parameters: msdyn_SwarmExpertFinderActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SwarmExpertFinder`;

    const body = requestBody({
      SkillList: this.parameters.SkillList,
      SwarmId: this.parameters.SwarmId,
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

  parseResponse(_response: Response): Promise<msdyn_SwarmExpertFinderResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
