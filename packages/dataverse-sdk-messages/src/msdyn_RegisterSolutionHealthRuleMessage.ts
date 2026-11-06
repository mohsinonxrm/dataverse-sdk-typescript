import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type {
  msdyn_RegisterSolutionHealthRuleResponse as msdyn_RegisterSolutionHealthRuleResponseData,
  msdyn_solutionhealthruleset,
  workflow,
} from "./types/index.js";

/**
 * msdyn_RegisterSolutionHealthRule request message
 *
 * Web API Action: msdyn_RegisterSolutionHealthRule
 */
export class msdyn_RegisterSolutionHealthRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_RegisterSolutionHealthRuleResponse>
{
  constructor(
    public ruleDescription: string,
    public owningSolutionId: string,
    public uniqueName: string,
    public resolutionAction: EntityReference,
    public ruleSetId: msdyn_solutionhealthruleset,
    public ruleArguments: string,
    public ruleName: string,
    public workflowReference: workflow,
    public resolutionMessage: string
  ) {
    super("msdyn_RegisterSolutionHealthRule");
  }

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
    return msdyn_RegisterSolutionHealthRuleResponse.fromResponse(data);
  }
}

/**
 * msdyn_RegisterSolutionHealthRule response message
 */
export class msdyn_RegisterSolutionHealthRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_RegisterSolutionHealthRuleResponseData) {
    super("msdyn_RegisterSolutionHealthRule");
  }

  static fromResponse(data: unknown): msdyn_RegisterSolutionHealthRuleResponse {
    return new msdyn_RegisterSolutionHealthRuleResponse(
      responseObject<msdyn_RegisterSolutionHealthRuleResponseData>(data)
    );
  }
}
