import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Response from the msdyn_OnClosureAgentDisengaged action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_OnClosureAgentDisengagedResponse = void;

/**
 * Parameters of the msdyn_OnClosureAgentDisengaged action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OnClosureAgentDisengagedActionParameters {
  Action: number;
  LastEmailRecord?: EntityReference | EntityPayload<email>;
  Target: EntityReference | AnyEntityPayload;
  Reason: number;
}

/**
 * msdyn_OnClosureAgentDisengaged action
 *
 * Unbound action
 */
export class msdyn_OnClosureAgentDisengagedAction implements Executable<msdyn_OnClosureAgentDisengagedResponse> {
  constructor(public readonly parameters: msdyn_OnClosureAgentDisengagedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnClosureAgentDisengaged`;

    const body = requestBody({
      Action: this.parameters.Action,
      LastEmailRecord: this.parameters.LastEmailRecord,
      Target: this.parameters.Target,
      Reason: this.parameters.Reason,
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

  parseResponse(_response: Response): Promise<msdyn_OnClosureAgentDisengagedResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
