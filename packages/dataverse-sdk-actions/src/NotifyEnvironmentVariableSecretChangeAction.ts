import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from NotifyEnvironmentVariableSecretChange action
 */
export interface NotifyEnvironmentVariableSecretChangeResponse {
  // No content returned
}

/**
 * Parameters of the NotifyEnvironmentVariableSecretChange action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface NotifyEnvironmentVariableSecretChangeActionParameters {
  KeyVaultUrl: string;
  SecretName: string;
}

/**
 * NotifyEnvironmentVariableSecretChange action
 *
 * Unbound action
 */
export class NotifyEnvironmentVariableSecretChangeAction implements Executable<NotifyEnvironmentVariableSecretChangeResponse> {
  constructor(public readonly parameters: NotifyEnvironmentVariableSecretChangeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/NotifyEnvironmentVariableSecretChange`;

    const body = requestBody({
      KeyVaultUrl: this.parameters.KeyVaultUrl,
      SecretName: this.parameters.SecretName,
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

  async parseResponse(response: Response): Promise<NotifyEnvironmentVariableSecretChangeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as NotifyEnvironmentVariableSecretChangeResponse;
    return (await response.json()) as NotifyEnvironmentVariableSecretChangeResponse;
  }
}
