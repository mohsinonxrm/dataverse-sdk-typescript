import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { DependencyMetadataCollection } from "./types/index.js";

/**
 * Response from RetrieveMissingDependenciesWithMetadata function
 */
export interface RetrieveMissingDependenciesWithMetadataResponse {
  DependencyMetadataCollection: DependencyMetadataCollection;
}

/**
 * Parameters of the RetrieveMissingDependenciesWithMetadata function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMissingDependenciesWithMetadataFunctionParameters {
  SolutionUniqueName: string;
  SkipManagedDependencies: boolean;
}

/**
 * RetrieveMissingDependenciesWithMetadata function
 *
 * Unbound function
 */
export class RetrieveMissingDependenciesWithMetadataFunction implements Executable<RetrieveMissingDependenciesWithMetadataResponse> {
  constructor(
    public readonly parameters: RetrieveMissingDependenciesWithMetadataFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingDependenciesWithMetadata`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.SolutionUniqueName !== undefined) {
      aliases.push(`SolutionUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.SolutionUniqueName, "Edm.String"));
    }
    if (this.parameters.SkipManagedDependencies !== undefined) {
      aliases.push(`SkipManagedDependencies=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.SkipManagedDependencies, "Edm.Boolean")
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveMissingDependenciesWithMetadataResponse;
    return (await response.json()) as RetrieveMissingDependenciesWithMetadataResponse;
  }
}
