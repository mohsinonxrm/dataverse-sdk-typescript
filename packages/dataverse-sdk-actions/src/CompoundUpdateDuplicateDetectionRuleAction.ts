import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CompoundUpdateDuplicateDetectionRule action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CompoundUpdateDuplicateDetectionRuleResponse = void;

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

  parseResponse(_response: Response): Promise<CompoundUpdateDuplicateDetectionRuleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
