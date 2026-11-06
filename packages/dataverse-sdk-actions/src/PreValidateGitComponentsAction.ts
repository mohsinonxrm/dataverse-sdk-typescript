import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PreValidateGitComponents action
 */
export interface PreValidateGitComponentsResponse {
  ValidationMessages: string;
}

/**
 * PreValidateGitComponents action
 *
 * Unbound action
 */
export class PreValidateGitComponentsAction implements Executable<PreValidateGitComponentsResponse> {
  constructor(
    public readonly solutionUniqueName: string,
    public readonly isRetriableOnly?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PreValidateGitComponents`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
      IsRetriableOnly: this.isRetriableOnly,
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

  async parseResponse(response: Response): Promise<PreValidateGitComponentsResponse> {
    const data = await response.json();
    return data as PreValidateGitComponentsResponse;
  }
}
