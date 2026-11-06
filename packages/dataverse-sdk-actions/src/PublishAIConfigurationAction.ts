import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PublishAIConfiguration action
 */
export interface PublishAIConfigurationResponse {
  response: string;
}

/**
 * PublishAIConfiguration action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 */
export class PublishAIConfigurationAction implements Executable<PublishAIConfigurationResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly version: string,
    public readonly source?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.PublishAIConfiguration`;

    const body: Record<string, unknown> = {
      version: this.version,
      source: this.source,
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

  async parseResponse(response: Response): Promise<PublishAIConfigurationResponse> {
    const data = await response.json();
    return data as PublishAIConfigurationResponse;
  }
}
