import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SetPreferredSolution action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SetPreferredSolutionResponse = void;

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

  parseResponse(_response: Response): Promise<SetPreferredSolutionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
