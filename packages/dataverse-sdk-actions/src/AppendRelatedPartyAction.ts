import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from AppendRelatedParty action
 */
export interface AppendRelatedPartyResponse {
  // No content returned
}

/**
 * AppendRelatedParty action
 *
 * Unbound action
 */
export class AppendRelatedPartyAction implements Executable<AppendRelatedPartyResponse> {
  constructor(
    public readonly activity: EntityReference | AnyEntityPayload,
    public readonly party: EntityReference | AnyEntityPayload
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AppendRelatedParty`;

    const body: Record<string, unknown> = {
      Activity: this.activity,
      Party: this.party,
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

  async parseResponse(response: Response): Promise<AppendRelatedPartyResponse> {
    // No return value (204 No Content)
    return {};
  }
}
