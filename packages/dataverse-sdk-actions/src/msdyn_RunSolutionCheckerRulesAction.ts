import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RunSolutionCheckerRules action
 */
export interface msdyn_RunSolutionCheckerRulesResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_RunSolutionCheckerRules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RunSolutionCheckerRulesActionParameters {
  AnalysisComponentId?: string;
  InAppNotificationEnabled?: boolean;
}

/**
 * msdyn_RunSolutionCheckerRules action
 *
 * Unbound action
 */
export class msdyn_RunSolutionCheckerRulesAction implements Executable<msdyn_RunSolutionCheckerRulesResponse> {
  constructor(public readonly parameters: msdyn_RunSolutionCheckerRulesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RunSolutionCheckerRules`;

    const body = requestBody({
      AnalysisComponentId: this.parameters.AnalysisComponentId,
      InAppNotificationEnabled: this.parameters.InAppNotificationEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_RunSolutionCheckerRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RunSolutionCheckerRulesResponse;
    return (await response.json()) as msdyn_RunSolutionCheckerRulesResponse;
  }
}
