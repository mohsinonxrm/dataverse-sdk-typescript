import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { dependency } from "./types/index.js";

/**
 * Response from RetrieveDependenciesForDelete function
 */
export interface RetrieveDependenciesForDeleteResponse {
  value: dependency[];
}

/**
 * Parameters of the RetrieveDependenciesForDelete function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDependenciesForDeleteFunctionParameters {
  ObjectId: string;
  ComponentType: number;
}

/**
 * RetrieveDependenciesForDelete function
 *
 * Unbound function
 */
export class RetrieveDependenciesForDeleteFunction implements Executable<RetrieveDependenciesForDeleteResponse> {
  constructor(public readonly parameters: RetrieveDependenciesForDeleteFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDependenciesForDelete`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ObjectId, "Edm.Guid"));
    }
    if (this.parameters.ComponentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ComponentType, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<RetrieveDependenciesForDeleteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveDependenciesForDeleteResponse;
    return (await response.json()) as RetrieveDependenciesForDeleteResponse;
  }
}
