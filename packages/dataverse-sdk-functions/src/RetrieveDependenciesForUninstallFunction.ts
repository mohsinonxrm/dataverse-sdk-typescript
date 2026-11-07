import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { dependency } from "./types/index.js";

/**
 * Response from the RetrieveDependenciesForUninstall function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveDependenciesForUninstallResponse = Array<
  dependency & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * Parameters of the RetrieveDependenciesForUninstall function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDependenciesForUninstallFunctionParameters {
  SolutionUniqueName: string;
}

/**
 * RetrieveDependenciesForUninstall function
 *
 * Unbound function
 */
export class RetrieveDependenciesForUninstallFunction implements Executable<RetrieveDependenciesForUninstallResponse> {
  constructor(public readonly parameters: RetrieveDependenciesForUninstallFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDependenciesForUninstall`;

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

  async parseResponse(response: Response): Promise<RetrieveDependenciesForUninstallResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveDependenciesForUninstallResponse }).value;
  }
}
