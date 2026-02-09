import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CloneAsSolution action
 */
export interface CloneAsSolutionResponse {
  SolutionId: string;
}

/**
 * CloneAsSolution action
 *
 * Unbound action
 */
export class CloneAsSolutionAction implements Executable<CloneAsSolutionResponse> {
  constructor(
    public readonly parentSolutionUniqueName: string,
    public readonly displayName: string,
    public readonly versionNumber: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsSolution`;

    const body: Record<string, unknown> = {
      ParentSolutionUniqueName: this.parentSolutionUniqueName,
      DisplayName: this.displayName,
      VersionNumber: this.versionNumber,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CloneAsSolutionResponse> {
    const data = await response.json();
    return data as CloneAsSolutionResponse;
  }
}
