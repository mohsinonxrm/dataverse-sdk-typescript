import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveEnvironmentVariableValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEnvironmentVariableValueRequestParameters {
  DefinitionSchemaName: string;
}

/**
 * RetrieveEnvironmentVariableValue request message
 *
 * Web API Function: RetrieveEnvironmentVariableValue
 */
export class RetrieveEnvironmentVariableValueRequest
  extends OrganizationRequest
  implements Executable<RetrieveEnvironmentVariableValueResponse>
{
  declare readonly Parameters: Readonly<RetrieveEnvironmentVariableValueRequestParameters>;

  constructor(parameters: RetrieveEnvironmentVariableValueRequestParameters) {
    super("RetrieveEnvironmentVariableValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEnvironmentVariableValue`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.DefinitionSchemaName !== undefined) {
      aliases.push(`DefinitionSchemaName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.DefinitionSchemaName, "Edm.String")
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariableValueResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveEnvironmentVariableValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveEnvironmentVariableValue function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveEnvironmentVariableValueResult {
  "@odata.context"?: string;
  Value: string;
}

/**
 * RetrieveEnvironmentVariableValue response message
 *
 * `result` is the value the RetrieveEnvironmentVariableValue function returns (see {@link RetrieveEnvironmentVariableValueResult}).
 */
export class RetrieveEnvironmentVariableValueResponse extends OrganizationResponse {
  constructor(public result: RetrieveEnvironmentVariableValueResult) {
    super("RetrieveEnvironmentVariableValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveEnvironmentVariableValueResponse {
    return new RetrieveEnvironmentVariableValueResponse(
      data as RetrieveEnvironmentVariableValueResult
    );
  }
}
