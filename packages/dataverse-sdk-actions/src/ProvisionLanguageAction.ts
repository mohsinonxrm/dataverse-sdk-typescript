import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ProvisionLanguage action
 */
export interface ProvisionLanguageResponse {
  // No content returned
}

/**
 * Parameters of the ProvisionLanguage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ProvisionLanguageActionParameters {
  Language: number;
}

/**
 * ProvisionLanguage action
 *
 * Unbound action
 */
export class ProvisionLanguageAction implements Executable<ProvisionLanguageResponse> {
  constructor(public readonly parameters: ProvisionLanguageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguage`;

    const body = requestBody({
      Language: this.parameters.Language,
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

  async parseResponse(response: Response): Promise<ProvisionLanguageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ProvisionLanguageResponse;
    return (await response.json()) as ProvisionLanguageResponse;
  }
}
