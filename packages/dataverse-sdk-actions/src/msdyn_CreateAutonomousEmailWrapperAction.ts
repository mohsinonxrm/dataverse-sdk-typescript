import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CreateAutonomousEmailWrapper action
 */
export interface msdyn_CreateAutonomousEmailWrapperResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_CreateAutonomousEmailWrapper action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAutonomousEmailWrapperActionParameters {
  SenderEntity?: EntityReference | AnyEntityPayload;
  Entity: EntityReference | AnyEntityPayload;
  NextSuggestion: string;
  SourceContextEntity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateAutonomousEmailWrapper action
 *
 * Unbound action
 */
export class msdyn_CreateAutonomousEmailWrapperAction implements Executable<msdyn_CreateAutonomousEmailWrapperResponse> {
  constructor(public readonly parameters: msdyn_CreateAutonomousEmailWrapperActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmailWrapper`;

    const body = requestBody({
      SenderEntity: this.parameters.SenderEntity,
      Entity: this.parameters.Entity,
      NextSuggestion: this.parameters.NextSuggestion,
      SourceContextEntity: this.parameters.SourceContextEntity,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAutonomousEmailWrapperResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateAutonomousEmailWrapperResponse;
  }
}
