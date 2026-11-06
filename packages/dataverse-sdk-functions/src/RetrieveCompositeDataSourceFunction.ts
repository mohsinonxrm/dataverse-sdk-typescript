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
 * Parameters of the RetrieveCompositeDataSource function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCompositeDataSourceFunctionParameters {
  ParentSchemaName: string;
  ChildSchemaName: string;
}

/**
 * RetrieveCompositeDataSource function
 *
 * Unbound function
 */
export class RetrieveCompositeDataSourceFunction implements Executable<RetrieveCompositeDataSourceResponse> {
  constructor(public readonly parameters: RetrieveCompositeDataSourceFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCompositeDataSource`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ParentSchemaName !== undefined) {
      aliases.push(`ParentSchemaName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ParentSchemaName, "Edm.String"));
    }
    if (this.parameters.ChildSchemaName !== undefined) {
      aliases.push(`ChildSchemaName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ChildSchemaName, "Edm.String"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveCompositeDataSourceResponse;
    return (await response.json()) as RetrieveCompositeDataSourceResponse;
  }
}
