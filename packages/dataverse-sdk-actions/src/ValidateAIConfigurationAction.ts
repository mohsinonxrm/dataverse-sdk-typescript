import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ValidateAIConfiguration action
 */
export interface ValidateAIConfigurationResponse {
  result: string;
}

/**
 * ValidateAIConfiguration action
 *
 * Unbound action
 */
export class ValidateAIConfigurationAction implements Executable<ValidateAIConfigurationResponse> {
  constructor(
    public readonly version: string,
    public readonly aiconfigurationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateAIConfiguration`;

    const body: Record<string, unknown> = {
      version: this.version,
      aiconfigurationId: this.aiconfigurationId,
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

  async parseResponse(response: Response): Promise<ValidateAIConfigurationResponse> {
    const data = await response.json();
    return data as ValidateAIConfigurationResponse;
  }
}
