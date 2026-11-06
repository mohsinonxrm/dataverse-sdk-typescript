import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UninstallSolution action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UninstallSolutionResponse = void;

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

  parseResponse(_response: Response): Promise<UninstallSolutionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
