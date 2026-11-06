import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveCompositeDataSource function
 */
export interface RetrieveCompositeDataSourceResponse {
  value: EntityReference[];
}

/**
 * RetrieveCompositeDataSource function
 *
 * Unbound function
 */
export class RetrieveCompositeDataSourceFunction implements Executable<RetrieveCompositeDataSourceResponse> {
  constructor(
    public readonly parentSchemaName: string,
    public readonly childSchemaName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCompositeDataSource`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parentSchemaName !== undefined) {
      aliases.push(`ParentSchemaName=@p1`);
      params.append("@p1", formatParameterAlias(this.parentSchemaName, "Edm.String"));
    }
    if (this.childSchemaName !== undefined) {
      aliases.push(`ChildSchemaName=@p2`);
      params.append("@p2", formatParameterAlias(this.childSchemaName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveCompositeDataSourceResponse> {
    const data = await response.json();
    return data as RetrieveCompositeDataSourceResponse;
  }
}
