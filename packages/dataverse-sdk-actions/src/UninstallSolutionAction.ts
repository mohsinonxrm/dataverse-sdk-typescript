import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UninstallSolution action
 */
export interface UninstallSolutionResponse {
  // No content returned
}

/**
 * Parameters of the UninstallSolution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UninstallSolutionActionParameters {
  SolutionUniqueName: string;
}

/**
 * UninstallSolution action
 *
 * Unbound action
 */
export class UninstallSolutionAction implements Executable<UninstallSolutionResponse> {
  constructor(public readonly parameters: UninstallSolutionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolution`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<UninstallSolutionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UninstallSolutionResponse;
  }
}
