import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UnpublishAIConfiguration action
 */
export interface UnpublishAIConfigurationResponse {
  response: string;
}

/**
 * UnpublishAIConfiguration action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 */
export class UnpublishAIConfigurationAction implements Executable<UnpublishAIConfigurationResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly version: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnpublishAIConfiguration`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<UnpublishAIConfigurationResponse> {
    const data = await response.json();
    return data as UnpublishAIConfigurationResponse;
  }
}
