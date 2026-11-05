import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { DependencyMetadataCollection } from "./types/index.js";

/**
 * Response from RetrieveMissingDependenciesWithMetadata function
 */
export interface RetrieveMissingDependenciesWithMetadataResponse {
  DependencyMetadataCollection: DependencyMetadataCollection;
}

/**
 * RetrieveMissingDependenciesWithMetadata function
 *
 * Unbound function
 */
export class RetrieveMissingDependenciesWithMetadataFunction implements Executable<RetrieveMissingDependenciesWithMetadataResponse> {
  constructor(
    public readonly solutionUniqueName: string,
    public readonly skipManagedDependencies: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingDependenciesWithMetadata`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.solutionUniqueName !== undefined) {
      aliases.push(`SolutionUniqueName=@p1`);
      params.append("@p1", formatAliasValue(this.solutionUniqueName));
    }
    if (this.skipManagedDependencies !== undefined) {
      aliases.push(`SkipManagedDependencies=@p2`);
      params.append("@p2", formatAliasValue(this.skipManagedDependencies));
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
    const data = await response.json();
    return data as RetrieveMissingDependenciesWithMetadataResponse;
  }
}
