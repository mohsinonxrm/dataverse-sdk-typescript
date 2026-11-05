import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_analysisjob, msdyn_solutionhealthruleset } from "./types/index.js";

/**
 * msdyn_CreateNewAnalysisJobForRuleSet request message
 *
 * Web API Action: msdyn_CreateNewAnalysisJobForRuleSet
 */
export class msdyn_CreateNewAnalysisJobForRuleSetRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateNewAnalysisJobForRuleSetResponse>
{
  constructor(
    public solutionHealthRuleSet: msdyn_solutionhealthruleset,
    public triggerType: string,
    public inAppNotificationEnabled: boolean
  ) {
    super("msdyn_CreateNewAnalysisJobForRuleSet");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateNewAnalysisJobForRuleSet`;

    const body: Record<string, unknown> = {
      SolutionHealthRuleSet: this.solutionHealthRuleSet,
      TriggerType: this.triggerType,
      InAppNotificationEnabled: this.inAppNotificationEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_CreateNewAnalysisJobForRuleSetResponse> {
    const data = await response.json();
    return msdyn_CreateNewAnalysisJobForRuleSetResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionHealthRuleSet: this.solutionHealthRuleSet,
      TriggerType: this.triggerType,
      InAppNotificationEnabled: this.inAppNotificationEnabled,
    };
  }
}

/**
 * msdyn_CreateNewAnalysisJobForRuleSet response message
 */
export class msdyn_CreateNewAnalysisJobForRuleSetResponse extends OrganizationResponse {
  constructor(public result: msdyn_analysisjob) {
    super("msdyn_CreateNewAnalysisJobForRuleSet");
  }

  static fromResponse(data: unknown): msdyn_CreateNewAnalysisJobForRuleSetResponse {
    return new msdyn_CreateNewAnalysisJobForRuleSetResponse((data as any).value);
  }
}
