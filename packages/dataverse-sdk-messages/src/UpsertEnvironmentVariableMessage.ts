import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpsertEnvironmentVariable request message
 *
 * Web API Action: UpsertEnvironmentVariable
 */
export class UpsertEnvironmentVariableRequest
  extends OrganizationRequest
  implements Executable<UpsertEnvironmentVariableResponse>
{
  constructor(
    public displayName: string,
    public schemaName: string,
    public type: number,
    public defaultValue: string,
    public value: string,
    public secretStore: number,
    public parameterKey: string,
    public apiId: string
  ) {
    super("UpsertEnvironmentVariable");
  }

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
    return new UpsertEnvironmentVariableResponse();
  }
}

/**
 * UpsertEnvironmentVariable response message
 */
export class UpsertEnvironmentVariableResponse extends OrganizationResponse {
  constructor() {
    super("UpsertEnvironmentVariable");
  }

  static fromResponse(_data: unknown): UpsertEnvironmentVariableResponse {
    return new UpsertEnvironmentVariableResponse();
  }
}
