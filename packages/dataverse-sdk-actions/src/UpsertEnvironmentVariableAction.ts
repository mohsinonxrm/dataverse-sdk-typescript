import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpsertEnvironmentVariable action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpsertEnvironmentVariableResponse = void;

/**
 * Parameters of the UpsertEnvironmentVariable action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpsertEnvironmentVariableActionParameters {
  DisplayName?: string;
  SchemaName: string;
  Type: number;
  DefaultValue?: string;
  Value?: string;
  SecretStore?: number;
  ParameterKey?: string;
  ApiId?: string;
}

/**
 * UpsertEnvironmentVariable action
 *
 * Unbound action
 */
export class UpsertEnvironmentVariableAction implements Executable<UpsertEnvironmentVariableResponse> {
  constructor(public readonly parameters: UpsertEnvironmentVariableActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertEnvironmentVariable`;

    const body = requestBody({
      DisplayName: this.parameters.DisplayName,
      SchemaName: this.parameters.SchemaName,
      Type: this.parameters.Type,
      DefaultValue: this.parameters.DefaultValue,
      Value: this.parameters.Value,
      SecretStore: this.parameters.SecretStore,
      ParameterKey: this.parameters.ParameterKey,
      ApiId: this.parameters.ApiId,
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

  parseResponse(_response: Response): Promise<UpsertEnvironmentVariableResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
