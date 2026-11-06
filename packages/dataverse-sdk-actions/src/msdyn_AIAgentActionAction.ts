import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_AIAgentAction action
 */
export interface msdyn_AIAgentActionResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AIAgentActionResponse;
    return (await response.json()) as msdyn_AIAgentActionResponse;
  }
}
