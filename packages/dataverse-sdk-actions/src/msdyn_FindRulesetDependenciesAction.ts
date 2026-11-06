import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_FindRulesetDependencies action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FindRulesetDependenciesResponse {
  "@odata.context"?: string;
  DependenciesJson: string;
}

/**
 * Parameters of the msdyn_FindRulesetDependencies action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FindRulesetDependenciesActionParameters {
  InputEntityReference: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_FindRulesetDependencies action
 *
 * Unbound action
 */
export class msdyn_FindRulesetDependenciesAction implements Executable<msdyn_FindRulesetDependenciesResponse> {
  constructor(public readonly parameters: msdyn_FindRulesetDependenciesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FindRulesetDependencies`;

    const body = requestBody({
      InputEntityReference: this.parameters.InputEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_FindRulesetDependenciesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FindRulesetDependenciesResponse;
  }
}
