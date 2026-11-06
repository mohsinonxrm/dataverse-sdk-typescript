import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpsertEnvironmentVariable message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpsertEnvironmentVariableRequestParameters {
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
 * UpsertEnvironmentVariable request message
 *
 * Web API Action: UpsertEnvironmentVariable
 */
export class UpsertEnvironmentVariableRequest
  extends OrganizationRequest
  implements Executable<UpsertEnvironmentVariableResponse>
{
  declare readonly Parameters: Readonly<UpsertEnvironmentVariableRequestParameters>;

  constructor(parameters: UpsertEnvironmentVariableRequestParameters) {
    super("UpsertEnvironmentVariable", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertEnvironmentVariable`;

    const body = requestBody({
      DisplayName: this.Parameters.DisplayName,
      SchemaName: this.Parameters.SchemaName,
      Type: this.Parameters.Type,
      DefaultValue: this.Parameters.DefaultValue,
      Value: this.Parameters.Value,
      SecretStore: this.Parameters.SecretStore,
      ParameterKey: this.Parameters.ParameterKey,
      ApiId: this.Parameters.ApiId,
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
