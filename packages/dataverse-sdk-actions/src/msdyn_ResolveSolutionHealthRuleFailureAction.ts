import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_ResolveSolutionHealthRuleFailure action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ResolveSolutionHealthRuleFailureResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_ResolveSolutionHealthRuleFailureResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
