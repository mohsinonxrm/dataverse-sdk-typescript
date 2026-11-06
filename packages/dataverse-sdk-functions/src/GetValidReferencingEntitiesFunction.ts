import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetValidReferencingEntities function
 */
export interface GetValidReferencingEntitiesResponse {
  EntityNames: string[];
}

/**
 * Parameters of the GetValidReferencingEntities function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetValidReferencingEntitiesFunctionParameters {
  ReferencedEntityName?: string;
}

/**
 * GetValidReferencingEntities function
 *
 * Unbound function
 */
export class GetValidReferencingEntitiesFunction implements Executable<GetValidReferencingEntitiesResponse> {
  constructor(public readonly parameters: GetValidReferencingEntitiesFunctionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidReferencingEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ReferencedEntityName !== undefined) {
      aliases.push(`ReferencedEntityName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.ReferencedEntityName, "Edm.String")
      );
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

  async parseResponse(response: Response): Promise<GetValidReferencingEntitiesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetValidReferencingEntitiesResponse;
  }
}
