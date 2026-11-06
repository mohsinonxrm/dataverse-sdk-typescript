import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ValidateAIConfiguration action
 */
export interface ValidateAIConfigurationResponse {
  result: string;
}

/**
 * Parameters of the ValidateAIConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateAIConfigurationActionParameters {
  version: string;
  aiconfigurationId: string;
}

/**
 * ValidateAIConfiguration action
 *
 * Unbound action
 */
export class ValidateAIConfigurationAction implements Executable<ValidateAIConfigurationResponse> {
  constructor(public readonly parameters: ValidateAIConfigurationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateAIConfiguration`;

    const body = requestBody({
      version: this.parameters.version,
      aiconfigurationId: this.parameters.aiconfigurationId,
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

  async parseResponse(response: Response): Promise<ValidateAIConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ValidateAIConfigurationResponse;
    return (await response.json()) as ValidateAIConfigurationResponse;
  }
}
