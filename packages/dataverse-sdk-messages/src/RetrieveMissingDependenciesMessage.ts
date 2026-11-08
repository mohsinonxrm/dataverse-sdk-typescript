import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveMissingDependencies message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMissingDependenciesRequestParameters {
  SolutionUniqueName: string;
}

/**
 * RetrieveMissingDependencies request message
 *
 * Web API Function: RetrieveMissingDependencies
 */
export class RetrieveMissingDependenciesRequest
  extends OrganizationRequest
  implements Executable<RetrieveMissingDependenciesResponse>
{
  declare readonly Parameters: Readonly<RetrieveMissingDependenciesRequestParameters>;

  constructor(parameters: RetrieveMissingDependenciesRequestParameters) {
    super("RetrieveMissingDependencies", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingDependencies`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.SolutionUniqueName !== undefined) {
      aliases.push(`SolutionUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.SolutionUniqueName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveMissingDependenciesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveMissingDependenciesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveMissingDependenciesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveMissingDependencies function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveMissingDependenciesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveMissingDependencies response message
 *
 * `result` is the value the RetrieveMissingDependencies function returns (see {@link RetrieveMissingDependenciesResult}).
 */
export class RetrieveMissingDependenciesResponse extends OrganizationResponse {
  constructor(public result: RetrieveMissingDependenciesResult) {
    super("RetrieveMissingDependencies");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveMissingDependenciesResponse {
    return new RetrieveMissingDependenciesResponse(
      data === undefined ? [] : (data as { value: RetrieveMissingDependenciesResult }).value
    );
  }
}
