import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from EqualUserOrUserHierarchyAndTeams function
 */
export interface EqualUserOrUserHierarchyAndTeamsResponse {
  value: boolean;
}

/**
 * EqualUserOrUserHierarchyAndTeams function
 *
 * Unbound function
 */
export class EqualUserOrUserHierarchyAndTeamsFunction implements Executable<EqualUserOrUserHierarchyAndTeamsResponse> {
  constructor(public readonly propertyName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/EqualUserOrUserHierarchyAndTeams`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatAliasValue(this.propertyName));
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

  async parseResponse(response: Response): Promise<EqualUserOrUserHierarchyAndTeamsResponse> {
    const data = await response.json();
    return data as EqualUserOrUserHierarchyAndTeamsResponse;
  }
}
