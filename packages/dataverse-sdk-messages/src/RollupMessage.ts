import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { enumBody } from "./internal/enumBody.js";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RollupType, TypedQueryBase } from "./types/index.js";

/**
 * Parameters of the Rollup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RollupRequestParameters {
  Target: EntityReference;
  Query?: TypedQueryBase;
  RollupType: RollupType | keyof typeof RollupType;
}

/**
 * Rollup request message
 *
 * Web API Function: Rollup
 */
export class RollupRequest extends OrganizationRequest implements Executable<RollupResponse> {
  declare readonly Parameters: Readonly<RollupRequestParameters>;

  constructor(parameters: RollupRequestParameters) {
    super("Rollup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Rollup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.Query !== undefined) {
      aliases.push(`Query=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(
          enumBody(this.Parameters.Query, "QueryBase"),
          "mscrm.QueryBase",
          "ComplexType"
        )
      );
    }
    if (this.Parameters.RollupType !== undefined) {
      aliases.push(`RollupType=@p3`);
      params.append(
        "@p3",
        formatParameterAlias(this.Parameters.RollupType, "mscrm.RollupType", "EnumerationType")
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

  async parseResponse(response: Response): Promise<RollupResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RollupResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RollupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Rollup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RollupResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Rollup response message
 *
 * `result` is the value the Rollup function returns (see {@link RollupResult}).
 */
export class RollupResponse extends OrganizationResponse {
  constructor(public result: RollupResult) {
    super("Rollup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RollupResponse {
    return new RollupResponse(data === undefined ? [] : (data as { value: RollupResult }).value);
  }
}
