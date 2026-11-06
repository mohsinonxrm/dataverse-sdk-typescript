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
 * Parameters of the RetrieveMissingDependencies function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMissingDependenciesFunctionParameters {
  SolutionUniqueName: string;
}

/**
 * RetrieveMissingDependencies function
 *
 * Unbound function
 */
export class RetrieveMissingDependenciesFunction implements Executable<RetrieveMissingDependenciesResponse> {
  constructor(public readonly parameters: RetrieveMissingDependenciesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingDependencies`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.SolutionUniqueName !== undefined) {
      aliases.push(`SolutionUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.SolutionUniqueName, "Edm.String"));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveMissingDependenciesResponse;
  }
}
