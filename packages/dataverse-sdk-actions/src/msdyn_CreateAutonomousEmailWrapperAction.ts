import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
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
  SourceContextEntity?: EntityReference | AnyEntityPayload;
  Entity: EntityReference | AnyEntityPayload;
  NextSuggestion: string;
  SenderEntity?: EntityReference | AnyEntityPayload;
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
      SourceContextEntity: this.parameters.SourceContextEntity,
      Entity: this.parameters.Entity,
      NextSuggestion: this.parameters.NextSuggestion,
      SenderEntity: this.parameters.SenderEntity,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateAutonomousEmailWrapperResponse;
    return (await response.json()) as msdyn_CreateAutonomousEmailWrapperResponse;
  }
}
