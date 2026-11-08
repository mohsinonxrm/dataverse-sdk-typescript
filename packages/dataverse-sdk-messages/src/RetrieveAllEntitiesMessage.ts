import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ComplexEntityMetadata, EntityFilters } from "./types/index.js";

/**
 * Parameters of the RetrieveAllEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAllEntitiesRequestParameters {
  EntityFilters: EntityFilters | keyof typeof EntityFilters;
  RetrieveAsIfPublished: boolean;
}

/**
 * RetrieveAllEntities request message
 *
 * Web API Function: RetrieveAllEntities
 */
export class RetrieveAllEntitiesRequest
  extends OrganizationRequest
  implements Executable<RetrieveAllEntitiesResponse>
{
  declare readonly Parameters: Readonly<RetrieveAllEntitiesRequestParameters>;

  constructor(parameters: RetrieveAllEntitiesRequestParameters) {
    super("RetrieveAllEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAllEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityFilters !== undefined) {
      aliases.push(`EntityFilters=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(
          this.Parameters.EntityFilters,
          "mscrm.EntityFilters",
          "EnumerationType"
        )
      );
    }
    if (this.Parameters.RetrieveAsIfPublished !== undefined) {
      aliases.push(`RetrieveAsIfPublished=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.RetrieveAsIfPublished, "Edm.Boolean")
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

  async parseResponse(response: Response): Promise<RetrieveAllEntitiesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAllEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAllEntities function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAllEntitiesResult {
  "@odata.context"?: string;
  EntityMetadata: ComplexEntityMetadata[];
  Timestamp: string;
}

/**
 * RetrieveAllEntities response message
 *
 * `result` is the value the RetrieveAllEntities function returns (see {@link RetrieveAllEntitiesResult}).
 */
export class RetrieveAllEntitiesResponse extends OrganizationResponse {
  constructor(public result: RetrieveAllEntitiesResult) {
    super("RetrieveAllEntities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAllEntitiesResponse {
    return new RetrieveAllEntitiesResponse(data as RetrieveAllEntitiesResult);
  }
}
