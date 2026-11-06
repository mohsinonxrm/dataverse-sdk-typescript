import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_AIAgentAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AIAgentActionResponse {
  "@odata.context"?: string;
  Outcome: string;
  Reason: string;
}

/**
 * Parameters of the msdyn_AIAgentAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIAgentActionActionParameters {
  RequestedAction: number;
  SourceForLog?: string;
  Entity: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_AIAgentAction action
 *
 * Unbound action
 */
export class msdyn_AIAgentActionAction implements Executable<msdyn_AIAgentActionResponse> {
  constructor(public readonly parameters: msdyn_AIAgentActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIAgentAction`;

    const body = requestBody({
      RequestedAction: this.parameters.RequestedAction,
      SourceForLog: this.parameters.SourceForLog,
      Entity: this.parameters.Entity,
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

  async parseResponse(response: Response): Promise<msdyn_AIAgentActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AIAgentActionResponse;
  }
}
