import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateAutonomousEmailWrapper action
 */
export interface msdyn_CreateAutonomousEmailWrapperResponse {
  Result: string;
}

/**
 * msdyn_CreateAutonomousEmailWrapper action
 *
 * Unbound action
 */
export class msdyn_CreateAutonomousEmailWrapperAction implements Executable<msdyn_CreateAutonomousEmailWrapperResponse> {
  constructor(
    public readonly senderEntity: EntityReference,
    public readonly entity: EntityReference,
    public readonly nextSuggestion: string,
    public readonly sourceContextEntity: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmailWrapper`;

    const body: Record<string, unknown> = {
      SenderEntity: this.senderEntity,
      Entity: this.entity,
      NextSuggestion: this.nextSuggestion,
      SourceContextEntity: this.sourceContextEntity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateAutonomousEmailWrapperResponse> {
    const data = await response.json();
    return data as msdyn_CreateAutonomousEmailWrapperResponse;
  }
}
