import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { PreferredSolutionDetails } from "./types/index.js";

/**
 * Response from PreferredSolutionUsedBy function
 */
export interface PreferredSolutionUsedByResponse {
  NumberOfAssociatedUsers: number;
  PreferredSolutionDetails: PreferredSolutionDetails;
}

/**
 * Parameters of the PreferredSolutionUsedBy function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PreferredSolutionUsedByFunctionParameters {
  SolutionId: string;
}

/**
 * PreferredSolutionUsedBy function
 *
 * Unbound function
 */
export class PreferredSolutionUsedByFunction implements Executable<PreferredSolutionUsedByResponse> {
  constructor(public readonly parameters: PreferredSolutionUsedByFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/PreferredSolutionUsedBy`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.SolutionId !== undefined) {
      aliases.push(`SolutionId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.SolutionId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<PreferredSolutionUsedByResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PreferredSolutionUsedByResponse;
  }
}
