import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveEnvironmentVariableSecretValue request message
 *
 * Web API Action: RetrieveEnvironmentVariableSecretValue
 */
export class RetrieveEnvironmentVariableSecretValueRequest
  extends OrganizationRequest
  implements Executable<RetrieveEnvironmentVariableSecretValueResponse>
{
  constructor(public environmentVariableName: string) {
    super("RetrieveEnvironmentVariableSecretValue");
  }

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
    return RetrieveEnvironmentVariableSecretValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EnvironmentVariableName: this.environmentVariableName,
    };
  }
}

/**
 * RetrieveEnvironmentVariableSecretValue response message
 */
export class RetrieveEnvironmentVariableSecretValueResponse extends OrganizationResponse {
  constructor(public result: RetrieveEnvironmentVariableSecretValueResponse) {
    super("RetrieveEnvironmentVariableSecretValue");
  }

  static fromResponse(data: unknown): RetrieveEnvironmentVariableSecretValueResponse {
    return new RetrieveEnvironmentVariableSecretValueResponse((data as any).value);
  }
}
