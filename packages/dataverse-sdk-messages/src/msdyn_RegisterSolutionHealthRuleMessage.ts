import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_solutionhealthruleset, workflow } from "./types/index.js";

/**
 * Parameters of the msdyn_RegisterSolutionHealthRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RegisterSolutionHealthRuleRequestParameters {
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
 * msdyn_RegisterSolutionHealthRule request message
 *
 * Web API Action: msdyn_RegisterSolutionHealthRule
 */
export class msdyn_RegisterSolutionHealthRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_RegisterSolutionHealthRuleResponse>
{
  declare readonly Parameters: Readonly<msdyn_RegisterSolutionHealthRuleRequestParameters>;

  constructor(parameters: msdyn_RegisterSolutionHealthRuleRequestParameters) {
    super("msdyn_RegisterSolutionHealthRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterSolutionHealthRule`;

    const body = requestBody({
      RuleDescription: this.Parameters.RuleDescription,
      OwningSolutionId: this.Parameters.OwningSolutionId,
      UniqueName: this.Parameters.UniqueName,
      ResolutionAction: this.Parameters.ResolutionAction,
      RuleSetId: this.Parameters.RuleSetId,
      RuleArguments: this.Parameters.RuleArguments,
      RuleName: this.Parameters.RuleName,
      WorkflowReference: this.Parameters.WorkflowReference,
      ResolutionMessage: this.Parameters.ResolutionMessage,
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
    return msdyn_RegisterSolutionHealthRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RegisterSolutionHealthRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RegisterSolutionHealthRuleResult {
  "@odata.context"?: string;
  RuleId: string;
}

/**
 * msdyn_RegisterSolutionHealthRule response message
 *
 * `result` is the value the msdyn_RegisterSolutionHealthRule action returns (see {@link msdyn_RegisterSolutionHealthRuleResult}).
 */
export class msdyn_RegisterSolutionHealthRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_RegisterSolutionHealthRuleResult) {
    super("msdyn_RegisterSolutionHealthRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RegisterSolutionHealthRuleResponse {
    return new msdyn_RegisterSolutionHealthRuleResponse(
      data as msdyn_RegisterSolutionHealthRuleResult
    );
  }
}
