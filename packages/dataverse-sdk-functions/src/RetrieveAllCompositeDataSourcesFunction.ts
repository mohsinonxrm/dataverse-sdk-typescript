import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveAllCompositeDataSources function
 */
export interface RetrieveAllCompositeDataSourcesResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveAllCompositeDataSources function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAllCompositeDataSourcesFunctionParameters {
  ParentSchemaName: string;
}

/**
 * RetrieveAllCompositeDataSources function
 *
 * Unbound function
 */
export class RetrieveAllCompositeDataSourcesFunction implements Executable<RetrieveAllCompositeDataSourcesResponse> {
  constructor(public readonly parameters: RetrieveAllCompositeDataSourcesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAllCompositeDataSources`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ParentSchemaName !== undefined) {
      aliases.push(`ParentSchemaName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ParentSchemaName, "Edm.String"));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveAllCompositeDataSourcesResponse;
  }
}
