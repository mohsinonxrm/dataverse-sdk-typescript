import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CompoundUpdateDuplicateDetectionRule action
 */
export interface CompoundUpdateDuplicateDetectionRuleResponse {
  // No content returned
}

/**
 * CompoundUpdateDuplicateDetectionRule action
 *
 * Unbound action
 */
export class CompoundUpdateDuplicateDetectionRuleAction implements Executable<CompoundUpdateDuplicateDetectionRuleResponse> {
  constructor(
    public readonly entity: EntityReference | AnyEntityPayload,
    public readonly childEntities: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CompoundUpdateDuplicateDetectionRule`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      ChildEntities: this.childEntities,
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

  async parseResponse(response: Response): Promise<CompoundUpdateDuplicateDetectionRuleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
