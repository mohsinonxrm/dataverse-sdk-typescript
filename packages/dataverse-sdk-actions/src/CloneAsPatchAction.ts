import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CloneAsPatch action
 */
export interface CloneAsPatchResponse {
  SolutionId: string;
}

/**
 * CloneAsPatch action
 *
 * Unbound action
 */
export class CloneAsPatchAction implements Executable<CloneAsPatchResponse> {
  constructor(
    public readonly parentSolutionUniqueName: string,
    public readonly displayName: string,
    public readonly versionNumber: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsPatch`;

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

  async parseResponse(response: Response): Promise<CloneAsPatchResponse> {
    const data = await response.json();
    return data as CloneAsPatchResponse;
  }
}
