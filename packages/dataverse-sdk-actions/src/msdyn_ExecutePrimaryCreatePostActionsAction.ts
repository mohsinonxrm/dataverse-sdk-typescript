import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_ExecutePrimaryCreatePostActions action
 */
export interface msdyn_ExecutePrimaryCreatePostActionsResponse {
  // No content returned
}

/**
 * msdyn_ExecutePrimaryCreatePostActions action
 *
 * Unbound action
 */
export class msdyn_ExecutePrimaryCreatePostActionsAction implements Executable<msdyn_ExecutePrimaryCreatePostActionsResponse> {
  constructor(
    public readonly sourceEntityReference: EntityReference,
    public readonly primaryEntityReference: EntityReference,
    public readonly ruleId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecutePrimaryCreatePostActions`;

    const body: Record<string, unknown> = {
      SourceEntityReference: this.sourceEntityReference,
      PrimaryEntityReference: this.primaryEntityReference,
      RuleId: this.ruleId,
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

  async parseResponse(response: Response): Promise<msdyn_ExecutePrimaryCreatePostActionsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
