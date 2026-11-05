import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { PreferredSolutionDetails } from "./types/index.js";

/**
 * Response from PreferredSolutionUsedBy function
 */
export interface PreferredSolutionUsedByResponse {
  NumberOfAssociatedUsers: number;
  PreferredSolutionDetails: PreferredSolutionDetails;
}

/**
 * PreferredSolutionUsedBy function
 *
 * Unbound function
 */
export class PreferredSolutionUsedByFunction implements Executable<PreferredSolutionUsedByResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/PreferredSolutionUsedBy`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.solutionId !== undefined) {
      aliases.push(`SolutionId=@p1`);
      params.append("@p1", formatAliasValue(this.solutionId));
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
    const data = await response.json();
    return data as PreferredSolutionUsedByResponse;
  }
}
