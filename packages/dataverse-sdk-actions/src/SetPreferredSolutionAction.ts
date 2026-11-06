import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SetPreferredSolution action
 */
export interface SetPreferredSolutionResponse {
  // No content returned
}

/**
 * Parameters of the SetPreferredSolution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetPreferredSolutionActionParameters {
  SolutionId: string;
}

/**
 * SetPreferredSolution action
 *
 * Unbound action
 */
export class SetPreferredSolutionAction implements Executable<SetPreferredSolutionResponse> {
  constructor(public readonly parameters: SetPreferredSolutionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetPreferredSolution`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<SetPreferredSolutionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as SetPreferredSolutionResponse;
  }
}
