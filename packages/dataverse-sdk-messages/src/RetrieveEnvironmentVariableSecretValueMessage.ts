import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RetrieveEnvironmentVariableSecretValueResponse as RetrieveEnvironmentVariableSecretValueResponseData } from "./types/index.js";

/**
 * Parameters of the RetrieveEnvironmentVariableSecretValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEnvironmentVariableSecretValueRequestParameters {
  EnvironmentVariableName: string;
}

/**
 * RetrieveEnvironmentVariableSecretValue request message
 *
 * Web API Action: RetrieveEnvironmentVariableSecretValue
 */
export class RetrieveEnvironmentVariableSecretValueRequest
  extends OrganizationRequest
  implements Executable<RetrieveEnvironmentVariableSecretValueResponse>
{
  declare readonly Parameters: Readonly<RetrieveEnvironmentVariableSecretValueRequestParameters>;

  constructor(parameters: RetrieveEnvironmentVariableSecretValueRequestParameters) {
    super("RetrieveEnvironmentVariableSecretValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveEnvironmentVariableSecretValue`;

    const body = requestBody({
      EnvironmentVariableName: this.Parameters.EnvironmentVariableName,
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
    return RetrieveEnvironmentVariableSecretValueResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
