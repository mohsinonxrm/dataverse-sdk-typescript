import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PublishAIConfiguration action
 */
export interface PublishAIConfigurationResponse {
  response: string;
}

/**
 * Parameters of the PublishAIConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PublishAIConfigurationActionParameters {
  version: string;
  source?: string;
}

/**
 * PublishAIConfiguration action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class PublishAIConfigurationAction implements Executable<PublishAIConfigurationResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly parameters: PublishAIConfigurationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.PublishAIConfiguration`;

    const body = requestBody({
      version: this.parameters.version,
      source: this.parameters.source,
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

  async parseResponse(response: Response): Promise<PublishAIConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PublishAIConfigurationResponse;
  }
}
