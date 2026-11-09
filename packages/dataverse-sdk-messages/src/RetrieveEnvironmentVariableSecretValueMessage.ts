import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return RetrieveEnvironmentVariableSecretValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveEnvironmentVariableSecretValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveEnvironmentVariableSecretValueResult {
  "@odata.context"?: string;
  EnvironmentVariableSecretValue: string;
}

/**
 * RetrieveEnvironmentVariableSecretValue response message
 *
 * `result` is the value the RetrieveEnvironmentVariableSecretValue action returns (see {@link RetrieveEnvironmentVariableSecretValueResult}).
 */
export class RetrieveEnvironmentVariableSecretValueResponse extends OrganizationResponse {
  constructor(public result: RetrieveEnvironmentVariableSecretValueResult) {
    super("RetrieveEnvironmentVariableSecretValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveEnvironmentVariableSecretValueResponse {
    return new RetrieveEnvironmentVariableSecretValueResponse(
      data as RetrieveEnvironmentVariableSecretValueResult
    );
  }
}
