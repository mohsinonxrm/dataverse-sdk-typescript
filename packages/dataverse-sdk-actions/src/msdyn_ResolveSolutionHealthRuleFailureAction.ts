import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ResolveSolutionHealthRuleFailure action
 */
export interface msdyn_ResolveSolutionHealthRuleFailureResponse {
  // No content returned
}

/**
 * msdyn_ResolveSolutionHealthRuleFailure action
 *
 * Unbound action
 */
export class msdyn_ResolveSolutionHealthRuleFailureAction implements Executable<msdyn_ResolveSolutionHealthRuleFailureResponse> {
  constructor(public readonly analysisResult?: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveSolutionHealthRuleFailure`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_ResolveSolutionHealthRuleFailureResponse> {
    // No return value (204 No Content)
    return {};
  }
}
