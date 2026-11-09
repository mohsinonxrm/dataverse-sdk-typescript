import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RetrieveEnvironmentVariableSecretValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveEnvironmentVariableSecretValueResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveEnvironmentVariableSecretValueResponse;
  }
}
