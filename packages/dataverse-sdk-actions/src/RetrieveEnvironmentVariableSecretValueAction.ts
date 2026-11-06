import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RetrieveEnvironmentVariableSecretValue action
 */
export interface RetrieveEnvironmentVariableSecretValueResponse {
  EnvironmentVariableSecretValue: string;
}

/**
 * Parameters of the RetrieveEnvironmentVariableSecretValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEnvironmentVariableSecretValueActionParameters {
  EnvironmentVariableName: string;
}

/**
 * RetrieveEnvironmentVariableSecretValue action
 *
 * Unbound action
 */
export class RetrieveEnvironmentVariableSecretValueAction implements Executable<RetrieveEnvironmentVariableSecretValueResponse> {
  constructor(public readonly parameters: RetrieveEnvironmentVariableSecretValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveEnvironmentVariableSecretValue`;

    const body = requestBody({
      EnvironmentVariableName: this.parameters.EnvironmentVariableName,
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

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariableSecretValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveEnvironmentVariableSecretValueResponse;
  }
}
