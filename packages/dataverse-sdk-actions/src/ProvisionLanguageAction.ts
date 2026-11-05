import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ProvisionLanguage action
 */
export interface ProvisionLanguageResponse {
  // No content returned
}

/**
 * ProvisionLanguage action
 *
 * Unbound action
 */
export class ProvisionLanguageAction implements Executable<ProvisionLanguageResponse> {
  constructor(public readonly language: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguage`;

    const body: Record<string, unknown> = {
      Language: this.language,
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

  async parseResponse(response: Response): Promise<ProvisionLanguageResponse> {
    // No return value (204 No Content)
    return {};
  }
}
