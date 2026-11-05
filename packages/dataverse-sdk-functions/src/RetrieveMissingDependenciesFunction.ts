import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveMissingDependencies function
 */
export interface RetrieveMissingDependenciesResponse {
  value: EntityReference[];
}

/**
 * RetrieveMissingDependencies function
 *
 * Unbound function
 */
export class RetrieveMissingDependenciesFunction implements Executable<RetrieveMissingDependenciesResponse> {
  constructor(public readonly solutionUniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingDependencies`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.solutionUniqueName !== undefined) {
      aliases.push(`SolutionUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.solutionUniqueName, "Edm.String"));
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
    const data = await response.json();
    return data as RetrieveMissingDependenciesResponse;
  }
}
