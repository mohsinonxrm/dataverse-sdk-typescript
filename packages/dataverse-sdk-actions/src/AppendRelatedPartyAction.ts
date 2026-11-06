import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from AppendRelatedParty action
 */
export interface AppendRelatedPartyResponse {
  // No content returned
}

/**
 * Parameters of the AppendRelatedParty action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AppendRelatedPartyActionParameters {
  Activity: EntityReference | AnyEntityPayload;
  Party: EntityReference | AnyEntityPayload;
}

/**
 * AppendRelatedParty action
 *
 * Unbound action
 */
export class AppendRelatedPartyAction implements Executable<AppendRelatedPartyResponse> {
  constructor(public readonly parameters: AppendRelatedPartyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AppendRelatedParty`;

    const body = requestBody({
      Activity: this.parameters.Activity,
      Party: this.parameters.Party,
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

  async parseResponse(response: Response): Promise<AppendRelatedPartyResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AppendRelatedPartyResponse;
  }
}
