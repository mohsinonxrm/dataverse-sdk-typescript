import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Response from msdyn_OnClosureAgentClosedCase action
 */
export interface msdyn_OnClosureAgentClosedCaseResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_OnClosureAgentClosedCase action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OnClosureAgentClosedCaseActionParameters {
  Reason: number;
  LastEmailRecord?: EntityReference | EntityPayload<email>;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_OnClosureAgentClosedCase action
 *
 * Unbound action
 */
export class msdyn_OnClosureAgentClosedCaseAction implements Executable<msdyn_OnClosureAgentClosedCaseResponse> {
  constructor(public readonly parameters: msdyn_OnClosureAgentClosedCaseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnClosureAgentClosedCase`;

    const body = requestBody({
      Reason: this.parameters.Reason,
      LastEmailRecord: this.parameters.LastEmailRecord,
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<msdyn_OnClosureAgentClosedCaseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OnClosureAgentClosedCaseResponse;
    return (await response.json()) as msdyn_OnClosureAgentClosedCaseResponse;
  }
}
