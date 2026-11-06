import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the AppendRelatedParty action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AppendRelatedPartyResponse = void;

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

  parseResponse(_response: Response): Promise<AppendRelatedPartyResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
