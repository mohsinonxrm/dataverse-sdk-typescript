import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the NotifyEnvironmentVariableSecretChange action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type NotifyEnvironmentVariableSecretChangeResponse = void;

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

  parseResponse(_response: Response): Promise<NotifyEnvironmentVariableSecretChangeResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
