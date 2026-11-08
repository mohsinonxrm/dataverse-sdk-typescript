import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type {
  ComplexEntityMetadata,
  DeletedMetadataCollection,
  DeletedMetadataFilters,
  EntityQueryExpression,
} from "./types/index.js";

/**
 * Parameters of the RetrieveMetadataChanges message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMetadataChangesRequestParameters {
  Query?: EntityQueryExpression;
  DeletedMetadataFilters?: DeletedMetadataFilters | keyof typeof DeletedMetadataFilters;
  ClientVersionStamp?: string;
  AppModuleId?: string;
  RetrieveAllSettings?: boolean;
}

/**
 * RetrieveMetadataChanges request message
 *
 * Web API Function: RetrieveMetadataChanges
 */
export class RetrieveMetadataChangesRequest
  extends OrganizationRequest
  implements Executable<RetrieveMetadataChangesResponse>
{
  declare readonly Parameters: Readonly<RetrieveMetadataChangesRequestParameters>;

  constructor(parameters: RetrieveMetadataChangesRequestParameters = {}) {
    super("RetrieveMetadataChanges", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMetadataChanges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Query !== undefined) {
      aliases.push(`Query=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(
          enumBody(this.Parameters.Query, "EntityQueryExpression"),
          "mscrm.EntityQueryExpression",
          "ComplexType"
        )
      );
    }
    if (this.Parameters.DeletedMetadataFilters !== undefined) {
      aliases.push(`DeletedMetadataFilters=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(
          this.Parameters.DeletedMetadataFilters,
          "mscrm.DeletedMetadataFilters",
          "EnumerationType"
        )
      );
    }
    if (this.Parameters.ClientVersionStamp !== undefined) {
      aliases.push(`ClientVersionStamp=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.ClientVersionStamp, "Edm.String"));
    }
    if (this.Parameters.AppModuleId !== undefined) {
      aliases.push(`AppModuleId=@p4`);
      params.append("@p4", formatParameterAlias(this.Parameters.AppModuleId, "Edm.Guid"));
    }
    if (this.Parameters.RetrieveAllSettings !== undefined) {
      aliases.push(`RetrieveAllSettings=@p5`);
      params.append(
        "@p5",
        formatParameterAlias(this.Parameters.RetrieveAllSettings, "Edm.Boolean")
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

  async parseResponse(response: Response): Promise<RetrieveMetadataChangesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveMetadataChangesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveMetadataChanges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveMetadataChangesResult {
  "@odata.context"?: string;
  DeletedMetadata: DeletedMetadataCollection;
  EntityMetadata: ComplexEntityMetadata[];
  ServerVersionStamp: string;
}

/**
 * RetrieveMetadataChanges response message
 *
 * `result` is the value the RetrieveMetadataChanges function returns (see {@link RetrieveMetadataChangesResult}).
 */
export class RetrieveMetadataChangesResponse extends OrganizationResponse {
  constructor(public result: RetrieveMetadataChangesResult) {
    super("RetrieveMetadataChanges");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveMetadataChangesResponse {
    return new RetrieveMetadataChangesResponse(data as RetrieveMetadataChangesResult);
  }
}
