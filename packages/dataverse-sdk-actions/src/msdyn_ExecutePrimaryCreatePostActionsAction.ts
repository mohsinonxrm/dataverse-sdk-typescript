import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ExecutePrimaryCreatePostActions action
 */
export interface msdyn_ExecutePrimaryCreatePostActionsResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_ExecutePrimaryCreatePostActionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ExecutePrimaryCreatePostActionsResponse;
  }
}
