import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { DependencyMetadataCollection } from "./types/index.js";

/**
 * Parameters of the RetrieveMissingDependenciesWithMetadata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMissingDependenciesWithMetadataRequestParameters {
  SolutionUniqueName: string;
  SkipManagedDependencies: boolean;
}

/**
 * RetrieveMissingDependenciesWithMetadata request message
 *
 * Web API Function: RetrieveMissingDependenciesWithMetadata
 */
export class RetrieveMissingDependenciesWithMetadataRequest
  extends OrganizationRequest
  implements Executable<RetrieveMissingDependenciesWithMetadataResponse>
{
  declare readonly Parameters: Readonly<RetrieveMissingDependenciesWithMetadataRequestParameters>;

  constructor(parameters: RetrieveMissingDependenciesWithMetadataRequestParameters) {
    super("RetrieveMissingDependenciesWithMetadata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingDependenciesWithMetadata`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.SolutionUniqueName !== undefined) {
      aliases.push(`SolutionUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.SolutionUniqueName, "Edm.String"));
    }
    if (this.Parameters.SkipManagedDependencies !== undefined) {
      aliases.push(`SkipManagedDependencies=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.SkipManagedDependencies, "Edm.Boolean")
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

  async parseResponse(
    response: Response
  ): Promise<RetrieveMissingDependenciesWithMetadataResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveMissingDependenciesWithMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveMissingDependenciesWithMetadata function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveMissingDependenciesWithMetadataResult {
  "@odata.context"?: string;
  DependencyMetadataCollection: DependencyMetadataCollection;
}

/**
 * RetrieveMissingDependenciesWithMetadata response message
 *
 * `result` is the value the RetrieveMissingDependenciesWithMetadata function returns (see {@link RetrieveMissingDependenciesWithMetadataResult}).
 */
export class RetrieveMissingDependenciesWithMetadataResponse extends OrganizationResponse {
  constructor(public result: RetrieveMissingDependenciesWithMetadataResult) {
    super("RetrieveMissingDependenciesWithMetadata");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveMissingDependenciesWithMetadataResponse {
    return new RetrieveMissingDependenciesWithMetadataResponse(
      data as RetrieveMissingDependenciesWithMetadataResult
    );
  }
}
