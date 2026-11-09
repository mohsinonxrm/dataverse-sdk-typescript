import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { StageSolutionResults } from "./types/index.js";

/**
 * Response from the StageSolution action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface StageSolutionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as StageSolutionResponse;
  }
}
