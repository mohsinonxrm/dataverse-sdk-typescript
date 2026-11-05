import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveEnvironmentVariableSecretValue action
 */
export interface RetrieveEnvironmentVariableSecretValueResponse {
  EnvironmentVariableSecretValue: string;
}

/**
 * RetrieveEnvironmentVariableSecretValue action
 *
 * Unbound action
 */
export class RetrieveEnvironmentVariableSecretValueAction implements Executable<RetrieveEnvironmentVariableSecretValueResponse> {
  constructor(public readonly environmentVariableName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveEnvironmentVariableSecretValue`;

    const body: Record<string, unknown> = {
      EnvironmentVariableName: this.environmentVariableName,
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

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariableSecretValueResponse> {
    const data = await response.json();
    return data as RetrieveEnvironmentVariableSecretValueResponse;
  }
}
