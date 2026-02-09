import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_analysisjob, msdyn_solutionhealthruleset } from "./types/index.js";

/**
 * Response from msdyn_CreateNewAnalysisJobForRuleSet action
 */
export interface msdyn_CreateNewAnalysisJobForRuleSetResponse {
  value: msdyn_analysisjob;
}

/**
 * msdyn_CreateNewAnalysisJobForRuleSet action
 *
 * Unbound action
 */
export class msdyn_CreateNewAnalysisJobForRuleSetAction implements Executable<msdyn_CreateNewAnalysisJobForRuleSetResponse> {
  constructor(
    public readonly solutionHealthRuleSet: msdyn_solutionhealthruleset,
    public readonly triggerType: string,
    public readonly inAppNotificationEnabled: boolean
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateNewAnalysisJobForRuleSetResponse> {
    const data = await response.json();
    return data as msdyn_CreateNewAnalysisJobForRuleSetResponse;
  }
}
