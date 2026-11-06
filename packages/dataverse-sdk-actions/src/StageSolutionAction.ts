import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { StageSolutionResults } from "./types/index.js";

/**
 * Response from StageSolution action
 */
export interface StageSolutionResponse {
  StageSolutionResults: StageSolutionResults;
}

/**
 * Parameters of the StageSolution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface StageSolutionActionParameters {
  CustomizationFile: string;
  StageSolutionUploadId?: string;
}

/**
 * StageSolution action
 *
 * Unbound action
 */
export class StageSolutionAction implements Executable<StageSolutionResponse> {
  constructor(public readonly parameters: StageSolutionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageSolution`;

    const body = requestBody({
      CustomizationFile: this.parameters.CustomizationFile,
      StageSolutionUploadId: this.parameters.StageSolutionUploadId,
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

  async parseResponse(response: Response): Promise<StageSolutionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as StageSolutionResponse;
  }
}
