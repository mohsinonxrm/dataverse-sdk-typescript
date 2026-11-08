import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ComplexEntityMetadata, EntityFilters } from "./types/index.js";

/**
 * Parameters of the RetrieveEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEntityRequestParameters {
  EntityFilters: EntityFilters | keyof typeof EntityFilters;
  LogicalName?: string;
  MetadataId: string;
  RetrieveAsIfPublished: boolean;
}

/**
 * RetrieveEntity request message
 *
 * Web API Function: RetrieveEntity
 */
export class RetrieveEntityRequest
  extends OrganizationRequest
  implements Executable<RetrieveEntityResponse>
{
  declare readonly Parameters: Readonly<RetrieveEntityRequestParameters>;

  constructor(parameters: RetrieveEntityRequestParameters) {
    super("RetrieveEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEntity`;

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
    if (this.Parameters.LogicalName !== undefined) {
      aliases.push(`LogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.LogicalName, "Edm.String"));
    }
    if (this.Parameters.MetadataId !== undefined) {
      aliases.push(`MetadataId=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.MetadataId, "Edm.Guid"));
    }
    if (this.Parameters.RetrieveAsIfPublished !== undefined) {
      aliases.push(`RetrieveAsIfPublished=@p4`);
      params.append(
        "@p4",
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

  async parseResponse(response: Response): Promise<RetrieveEntityResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveEntityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveEntity function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveEntityResult {
  "@odata.context"?: string;
  EntityMetadata: ComplexEntityMetadata;
}

/**
 * RetrieveEntity response message
 *
 * `result` is the value the RetrieveEntity function returns (see {@link RetrieveEntityResult}).
 */
export class RetrieveEntityResponse extends OrganizationResponse {
  constructor(public result: RetrieveEntityResult) {
    super("RetrieveEntity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveEntityResponse {
    return new RetrieveEntityResponse(data as RetrieveEntityResult);
  }
}
