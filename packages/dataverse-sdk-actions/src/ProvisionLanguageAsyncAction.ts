import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ProvisionLanguageAsync action
 */
export interface ProvisionLanguageAsyncResponse {
  AsyncOperationId: string;
}

/**
 * ProvisionLanguageAsync action
 *
 * Unbound action
 */
export class ProvisionLanguageAsyncAction implements Executable<ProvisionLanguageAsyncResponse> {
  constructor(public readonly language: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguageAsync`;

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

  async parseResponse(response: Response): Promise<ProvisionLanguageAsyncResponse> {
    const data = await response.json();
    return data as ProvisionLanguageAsyncResponse;
  }
}
