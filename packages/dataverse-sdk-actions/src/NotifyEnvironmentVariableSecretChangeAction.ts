import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from NotifyEnvironmentVariableSecretChange action
 */
export interface NotifyEnvironmentVariableSecretChangeResponse {
  // No content returned
}

/**
 * NotifyEnvironmentVariableSecretChange action
 *
 * Unbound action
 */
export class NotifyEnvironmentVariableSecretChangeAction implements Executable<NotifyEnvironmentVariableSecretChangeResponse> {
  constructor(
    public readonly keyVaultUrl: string,
    public readonly secretName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/NotifyEnvironmentVariableSecretChange`;

    const body: Record<string, unknown> = {
      KeyVaultUrl: this.keyVaultUrl,
      SecretName: this.secretName,
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

  async parseResponse(response: Response): Promise<NotifyEnvironmentVariableSecretChangeResponse> {
    // No return value (204 No Content)
    return {};
  }
}
