import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RetrieveEnvironmentVariableSecretValueResponse as RetrieveEnvironmentVariableSecretValueResponseData } from "./types/index.js";

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
}

/**
 * RetrieveEnvironmentVariableSecretValue response message
 */
export class RetrieveEnvironmentVariableSecretValueResponse extends OrganizationResponse {
  constructor(public result: RetrieveEnvironmentVariableSecretValueResponseData) {
    super("RetrieveEnvironmentVariableSecretValue");
  }

  static fromResponse(data: unknown): RetrieveEnvironmentVariableSecretValueResponse {
    return new RetrieveEnvironmentVariableSecretValueResponse(
      responseObject<RetrieveEnvironmentVariableSecretValueResponseData>(data)
    );
  }
}
