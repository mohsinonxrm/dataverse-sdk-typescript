import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_solutionhealthruleset, workflow } from "./types/index.js";

/**
 * Response from the msdyn_RegisterSolutionHealthRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RegisterSolutionHealthRuleResponse {
  "@odata.context"?: string;
  RuleId: string;
}

/**
 * Parameters of the msdyn_RegisterSolutionHealthRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RegisterSolutionHealthRuleActionParameters {
  RuleDescription?: string;
  OwningSolutionId?: string;
  UniqueName?: string;
  ResolutionAction?: EntityReference | AnyEntityPayload;
  RuleSetId: EntityReference | EntityPayload<msdyn_solutionhealthruleset>;
  RuleArguments?: string;
  RuleName: string;
  WorkflowReference: EntityReference | EntityPayload<workflow>;
  ResolutionMessage?: string;
}

/**
 * msdyn_RegisterSolutionHealthRule action
 *
 * Unbound action
 */
export class msdyn_RegisterSolutionHealthRuleAction implements Executable<msdyn_RegisterSolutionHealthRuleResponse> {
  constructor(public readonly parameters: msdyn_RegisterSolutionHealthRuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterSolutionHealthRule`;

    const body = requestBody({
      RuleDescription: this.parameters.RuleDescription,
      OwningSolutionId: this.parameters.OwningSolutionId,
      UniqueName: this.parameters.UniqueName,
      ResolutionAction: this.parameters.ResolutionAction,
      RuleSetId: this.parameters.RuleSetId,
      RuleArguments: this.parameters.RuleArguments,
      RuleName: this.parameters.RuleName,
      WorkflowReference: this.parameters.WorkflowReference,
      ResolutionMessage: this.parameters.ResolutionMessage,
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

  async parseResponse(response: Response): Promise<msdyn_RegisterSolutionHealthRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RegisterSolutionHealthRuleResponse;
  }
}
