import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UnpublishAIConfiguration action
 */
export interface UnpublishAIConfigurationResponse {
  response: string;
}

/**
 * Parameters of the UnpublishAIConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnpublishAIConfigurationActionParameters {
  version: string;
}

/**
 * UnpublishAIConfiguration action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class UnpublishAIConfigurationAction implements Executable<UnpublishAIConfigurationResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly parameters: UnpublishAIConfigurationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnpublishAIConfiguration`;

    const body = requestBody({
      version: this.parameters.version,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UnpublishAIConfigurationResponse;
    return (await response.json()) as UnpublishAIConfigurationResponse;
  }
}
