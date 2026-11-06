import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetValidReferencedEntities function
 */
export interface GetValidReferencedEntitiesResponse {
  EntityNames: string[];
}

/**
 * GetValidReferencedEntities function
 *
 * Unbound function
 */
export class GetValidReferencedEntitiesFunction implements Executable<GetValidReferencedEntitiesResponse> {
  constructor(public readonly referencingEntityName?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidReferencedEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.referencingEntityName !== undefined) {
      aliases.push(`ReferencingEntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.referencingEntityName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<GetValidReferencedEntitiesResponse> {
    const data = await response.json();
    return data as GetValidReferencedEntitiesResponse;
  }
}
