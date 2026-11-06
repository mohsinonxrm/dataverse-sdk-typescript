import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
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
    public readonly ruleDescription: string | undefined,
    public readonly owningSolutionId: string | undefined,
    public readonly uniqueName: string | undefined,
    public readonly resolutionAction: EntityReference | AnyEntityPayload | undefined,
    public readonly ruleSetId: EntityReference | EntityPayload<msdyn_solutionhealthruleset>,
    public readonly ruleArguments: string | undefined,
    public readonly ruleName: string,
    public readonly workflowReference: EntityReference | EntityPayload<workflow>,
    public readonly resolutionMessage?: string
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RegisterSolutionHealthRuleResponse> {
    const data = await response.json();
    return data as msdyn_RegisterSolutionHealthRuleResponse;
  }
}
