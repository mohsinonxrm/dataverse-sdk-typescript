import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveEnvironmentVariables message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEnvironmentVariablesRequestParameters {
  SchemaNames?: string[];
}

/**
 * RetrieveEnvironmentVariables request message
 *
 * Web API Function: RetrieveEnvironmentVariables
 */
export class RetrieveEnvironmentVariablesRequest
  extends OrganizationRequest
  implements Executable<RetrieveEnvironmentVariablesResponse>
{
  declare readonly Parameters: Readonly<RetrieveEnvironmentVariablesRequestParameters>;

  constructor(parameters: RetrieveEnvironmentVariablesRequestParameters = {}) {
    super("RetrieveEnvironmentVariables", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEnvironmentVariables`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.SchemaNames !== undefined) {
      aliases.push(`SchemaNames=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.SchemaNames, "Collection(Edm.String)", "Collection")
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

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariablesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveEnvironmentVariablesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveEnvironmentVariablesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveEnvironmentVariables function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveEnvironmentVariablesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveEnvironmentVariables response message
 *
 * `result` is the value the RetrieveEnvironmentVariables function returns (see {@link RetrieveEnvironmentVariablesResult}).
 */
export class RetrieveEnvironmentVariablesResponse extends OrganizationResponse {
  constructor(public result: RetrieveEnvironmentVariablesResult) {
    super("RetrieveEnvironmentVariables");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveEnvironmentVariablesResponse {
    return new RetrieveEnvironmentVariablesResponse(
      data === undefined ? [] : (data as { value: RetrieveEnvironmentVariablesResult }).value
    );
  }
}
