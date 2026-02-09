import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { msdyn_solutionhealthruleset, workflow } from "./types/index.js";

/**
 * Response from msdyn_RegisterSolutionHealthRule action
 */
export interface msdyn_RegisterSolutionHealthRuleResponse {
  RuleId: string;
}

/**
 * msdyn_RegisterSolutionHealthRule action
 *
 * Unbound action
 */
export class msdyn_RegisterSolutionHealthRuleAction implements Executable<msdyn_RegisterSolutionHealthRuleResponse> {
  constructor(
    public readonly ruleDescription: string,
    public readonly owningSolutionId: string,
    public readonly uniqueName: string,
    public readonly resolutionAction: EntityReference,
    public readonly ruleSetId: msdyn_solutionhealthruleset,
    public readonly ruleArguments: string,
    public readonly ruleName: string,
    public readonly workflowReference: workflow,
    public readonly resolutionMessage: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterSolutionHealthRule`;

    const body: Record<string, unknown> = {
      RuleDescription: this.ruleDescription,
      OwningSolutionId: this.owningSolutionId,
      UniqueName: this.uniqueName,
      ResolutionAction: this.resolutionAction,
      RuleSetId: this.ruleSetId,
      RuleArguments: this.ruleArguments,
      RuleName: this.ruleName,
      WorkflowReference: this.workflowReference,
      ResolutionMessage: this.resolutionMessage,
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

  async parseResponse(response: Response): Promise<msdyn_RegisterSolutionHealthRuleResponse> {
    const data = await response.json();
    return data as msdyn_RegisterSolutionHealthRuleResponse;
  }
}
