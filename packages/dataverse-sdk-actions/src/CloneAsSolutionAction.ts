import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CloneAsSolution action
 */
export interface CloneAsSolutionResponse {
  SolutionId: string;
}

/**
 * Parameters of the CloneAsSolution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneAsSolutionActionParameters {
  ParentSolutionUniqueName: string;
  DisplayName: string;
  VersionNumber: string;
}

/**
 * CloneAsSolution action
 *
 * Unbound action
 */
export class CloneAsSolutionAction implements Executable<CloneAsSolutionResponse> {
  constructor(public readonly parameters: CloneAsSolutionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsSolution`;

    const body = requestBody({
      ParentSolutionUniqueName: this.parameters.ParentSolutionUniqueName,
      DisplayName: this.parameters.DisplayName,
      VersionNumber: this.parameters.VersionNumber,
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

  async parseResponse(response: Response): Promise<CloneAsSolutionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CloneAsSolutionResponse;
    return (await response.json()) as CloneAsSolutionResponse;
  }
}
