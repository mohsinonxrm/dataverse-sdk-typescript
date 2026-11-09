import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RefreshChangesFromGit action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RefreshChangesFromGitResponse = void;

/**
 * Parameters of the RefreshChangesFromGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RefreshChangesFromGitActionParameters {
  SolutionUniqueName: string;
  LastRefreshTime?: string;
}

/**
 * RefreshChangesFromGit action
 *
 * Unbound action
 */
export class RefreshChangesFromGitAction implements Executable<RefreshChangesFromGitResponse> {
  constructor(public readonly parameters: RefreshChangesFromGitActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RefreshChangesFromGit`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      LastRefreshTime: this.parameters.LastRefreshTime,
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

  parseResponse(_response: Response): Promise<RefreshChangesFromGitResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
