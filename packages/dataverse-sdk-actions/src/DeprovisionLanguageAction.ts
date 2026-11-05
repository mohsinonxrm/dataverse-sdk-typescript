import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeprovisionLanguage action
 */
export interface DeprovisionLanguageResponse {
  // No content returned
}

/**
 * DeprovisionLanguage action
 *
 * Unbound action
 */
export class DeprovisionLanguageAction implements Executable<DeprovisionLanguageResponse> {
  constructor(
    public readonly language: number,
    public readonly cleanupLanguageRows: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeprovisionLanguage`;

    const body: Record<string, unknown> = {
      Language: this.language,
      CleanupLanguageRows: this.cleanupLanguageRows,
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

  async parseResponse(response: Response): Promise<DeprovisionLanguageResponse> {
    // No return value (204 No Content)
    return {};
  }
}
