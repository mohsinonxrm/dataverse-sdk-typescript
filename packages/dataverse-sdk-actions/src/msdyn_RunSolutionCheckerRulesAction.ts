import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RunSolutionCheckerRules action
 */
export interface msdyn_RunSolutionCheckerRulesResponse {
  // No content returned
}

/**
 * msdyn_RunSolutionCheckerRules action
 *
 * Unbound action
 */
export class msdyn_RunSolutionCheckerRulesAction implements Executable<msdyn_RunSolutionCheckerRulesResponse> {
  constructor(
    public readonly analysisComponentId: string,
    public readonly inAppNotificationEnabled: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RunSolutionCheckerRules`;

    const body: Record<string, unknown> = {
      AnalysisComponentId: this.analysisComponentId,
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

  async parseResponse(response: Response): Promise<msdyn_RunSolutionCheckerRulesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
