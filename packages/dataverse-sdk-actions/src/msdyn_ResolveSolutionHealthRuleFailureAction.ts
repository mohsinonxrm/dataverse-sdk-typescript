import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ResolveSolutionHealthRuleFailure action
 */
export interface msdyn_ResolveSolutionHealthRuleFailureResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ResolveSolutionHealthRuleFailure action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResolveSolutionHealthRuleFailureActionParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ResolveSolutionHealthRuleFailure action
 *
 * Unbound action
 */
export class msdyn_ResolveSolutionHealthRuleFailureAction implements Executable<msdyn_ResolveSolutionHealthRuleFailureResponse> {
  constructor(
    public readonly parameters: msdyn_ResolveSolutionHealthRuleFailureActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveSolutionHealthRuleFailure`;

    const body = requestBody({
      AnalysisResult: this.parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_ResolveSolutionHealthRuleFailureResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ResolveSolutionHealthRuleFailureResponse;
    return (await response.json()) as msdyn_ResolveSolutionHealthRuleFailureResponse;
  }
}
