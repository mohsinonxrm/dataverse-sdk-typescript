import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveAllCompositeDataSources function
 */
export interface RetrieveAllCompositeDataSourcesResponse {
  value: EntityReference[];
}

/**
 * RetrieveAllCompositeDataSources function
 *
 * Unbound function
 */
export class RetrieveAllCompositeDataSourcesFunction implements Executable<RetrieveAllCompositeDataSourcesResponse> {
  constructor(public readonly parentSchemaName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAllCompositeDataSources`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parentSchemaName !== undefined) {
      aliases.push(`ParentSchemaName=@p1`);
      params.append("@p1", formatAliasValue(this.parentSchemaName));
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

  async parseResponse(response: Response): Promise<RetrieveAllCompositeDataSourcesResponse> {
    const data = await response.json();
    return data as RetrieveAllCompositeDataSourcesResponse;
  }
}
