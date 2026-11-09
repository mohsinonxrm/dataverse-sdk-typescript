import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CloneAsSolution action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CloneAsSolutionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CloneAsSolutionResponse;
  }
}
