import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetValidReferencingEntities function
 */
export interface GetValidReferencingEntitiesResponse {
  EntityNames: string[];
}

/**
 * GetValidReferencingEntities function
 *
 * Unbound function
 */
export class GetValidReferencingEntitiesFunction implements Executable<GetValidReferencingEntitiesResponse> {
  constructor(public readonly referencedEntityName?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidReferencingEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.referencedEntityName !== undefined) {
      aliases.push(`ReferencedEntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.referencedEntityName, "Edm.String"));
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
    const data = await response.json();
    return data as GetValidReferencingEntitiesResponse;
  }
}
