import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpsertEnvironmentVariable action
 */
export interface UpsertEnvironmentVariableResponse {
  // No content returned
}

/**
 * UpsertEnvironmentVariable action
 *
 * Unbound action
 */
export class UpsertEnvironmentVariableAction implements Executable<UpsertEnvironmentVariableResponse> {
  constructor(
    public readonly displayName: string,
    public readonly schemaName: string,
    public readonly type: number,
    public readonly defaultValue: string,
    public readonly value: string,
    public readonly secretStore: number,
    public readonly parameterKey: string,
    public readonly apiId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertEnvironmentVariable`;

    const body: Record<string, unknown> = {
      DisplayName: this.displayName,
      SchemaName: this.schemaName,
      Type: this.type,
      DefaultValue: this.defaultValue,
      Value: this.value,
      SecretStore: this.secretStore,
      ParameterKey: this.parameterKey,
      ApiId: this.apiId,
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

  async parseResponse(response: Response): Promise<UpsertEnvironmentVariableResponse> {
    // No return value (204 No Content)
    return {};
  }
}
