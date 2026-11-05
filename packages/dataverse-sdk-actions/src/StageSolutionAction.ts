import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { StageSolutionResults } from "./types/index.js";

/**
 * Response from StageSolution action
 */
export interface StageSolutionResponse {
  StageSolutionResults: StageSolutionResults;
}

/**
 * StageSolution action
 *
 * Unbound action
 */
export class StageSolutionAction implements Executable<StageSolutionResponse> {
  constructor(
    public readonly customizationFile: string,
    public readonly stageSolutionUploadId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageSolution`;

    const body: Record<string, unknown> = {
      CustomizationFile: this.customizationFile,
      StageSolutionUploadId: this.stageSolutionUploadId,
    };

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
    const data = await response.json();
    return data as StageSolutionResponse;
  }
}
