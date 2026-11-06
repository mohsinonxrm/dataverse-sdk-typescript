import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CompoundUpdateDuplicateDetectionRule action
 */
export interface CompoundUpdateDuplicateDetectionRuleResponse {
  // No content returned
}

/**
 * Parameters of the CompoundUpdateDuplicateDetectionRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CompoundUpdateDuplicateDetectionRuleActionParameters {
  Entity: EntityReference | AnyEntityPayload;
  ChildEntities: Record<string, unknown>[];
}

/**
 * CompoundUpdateDuplicateDetectionRule action
 *
 * Unbound action
 */
export class CompoundUpdateDuplicateDetectionRuleAction implements Executable<CompoundUpdateDuplicateDetectionRuleResponse> {
  constructor(public readonly parameters: CompoundUpdateDuplicateDetectionRuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CompoundUpdateDuplicateDetectionRule`;

    const body = requestBody({
      Entity: this.parameters.Entity,
      ChildEntities: this.parameters.ChildEntities,
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

  async parseResponse(response: Response): Promise<CompoundUpdateDuplicateDetectionRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CompoundUpdateDuplicateDetectionRuleResponse;
    return (await response.json()) as CompoundUpdateDuplicateDetectionRuleResponse;
  }
}
