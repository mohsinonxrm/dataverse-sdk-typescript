import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the GetValidReferencedEntities function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetValidReferencedEntitiesResponse {
  "@odata.context"?: string;
  EntityNames: string[];
}

/**
 * Parameters of the GetValidReferencedEntities function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetValidReferencedEntitiesFunctionParameters {
  ReferencingEntityName?: string;
}

/**
 * GetValidReferencedEntities function
 *
 * Unbound function
 */
export class GetValidReferencedEntitiesFunction implements Executable<GetValidReferencedEntitiesResponse> {
  constructor(public readonly parameters: GetValidReferencedEntitiesFunctionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidReferencedEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ReferencingEntityName !== undefined) {
      aliases.push(`ReferencingEntityName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.ReferencingEntityName, "Edm.String")
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

  async parseResponse(response: Response): Promise<GetValidReferencedEntitiesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetValidReferencedEntitiesResponse;
  }
}
