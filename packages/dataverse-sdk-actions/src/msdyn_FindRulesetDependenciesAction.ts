import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_FindRulesetDependencies action
 */
export interface msdyn_FindRulesetDependenciesResponse {
  DependenciesJson: string;
}

/**
 * msdyn_FindRulesetDependencies action
 *
 * Unbound action
 */
export class msdyn_FindRulesetDependenciesAction implements Executable<msdyn_FindRulesetDependenciesResponse> {
  constructor(public readonly inputEntityReference: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FindRulesetDependencies`;

    const body: Record<string, unknown> = {
      InputEntityReference: this.inputEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_FindRulesetDependenciesResponse> {
    const data = await response.json();
    return data as msdyn_FindRulesetDependenciesResponse;
  }
}
