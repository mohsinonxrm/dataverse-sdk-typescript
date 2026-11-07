import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_ExecutePrimaryCreatePostActions action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ExecutePrimaryCreatePostActionsResponse = void;

/**
 * Parameters of the msdyn_ExecutePrimaryCreatePostActions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecutePrimaryCreatePostActionsActionParameters {
  SourceEntityReference: EntityReference | AnyEntityPayload;
  PrimaryEntityReference: EntityReference | AnyEntityPayload;
  RuleId: string;
}

/**
 * msdyn_ExecutePrimaryCreatePostActions action
 *
 * Unbound action
 */
export class msdyn_ExecutePrimaryCreatePostActionsAction implements Executable<msdyn_ExecutePrimaryCreatePostActionsResponse> {
  constructor(public readonly parameters: msdyn_ExecutePrimaryCreatePostActionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecutePrimaryCreatePostActions`;

    const body = requestBody({
      SourceEntityReference: this.parameters.SourceEntityReference,
      PrimaryEntityReference: this.parameters.PrimaryEntityReference,
      RuleId: this.parameters.RuleId,
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

  parseResponse(_response: Response): Promise<msdyn_ExecutePrimaryCreatePostActionsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
