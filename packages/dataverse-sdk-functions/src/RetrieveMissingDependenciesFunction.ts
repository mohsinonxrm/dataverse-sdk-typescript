import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the RetrieveMissingDependencies function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveMissingDependenciesResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveMissingDependenciesResponse }).value;
  }
}
