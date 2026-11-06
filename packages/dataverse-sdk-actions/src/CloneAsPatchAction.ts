import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CloneAsPatch action
 */
export interface CloneAsPatchResponse {
  SolutionId: string;
}

/**
 * Parameters of the CloneAsPatch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneAsPatchActionParameters {
  ParentSolutionUniqueName: string;
  DisplayName: string;
  VersionNumber: string;
}

/**
 * CloneAsPatch action
 *
 * Unbound action
 */
export class CloneAsPatchAction implements Executable<CloneAsPatchResponse> {
  constructor(public readonly parameters: CloneAsPatchActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsPatch`;

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

  async parseResponse(response: Response): Promise<CloneAsPatchResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CloneAsPatchResponse;
    return (await response.json()) as CloneAsPatchResponse;
  }
}
