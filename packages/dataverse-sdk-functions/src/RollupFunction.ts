import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { RollupType, TypedQueryBase } from "./types/index.js";

/**
 * Response from Rollup function
 */
export interface RollupResponse {
  value: EntityReference[];
}

/**
 * Rollup function
 *
 * Unbound function
 */
export class RollupFunction implements Executable<RollupResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly query: TypedQueryBase | undefined,
    public readonly rollupType: RollupType | keyof typeof RollupType
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Rollup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append("@p1", formatParameterAlias(this.target, "mscrm.crmbaseentity", "EntityType"));
    }
    if (this.query !== undefined) {
      aliases.push(`Query=@p2`);
      params.append("@p2", JSON.stringify(this.query));
    }
    if (this.rollupType !== undefined) {
      aliases.push(`RollupType=@p3`);
      params.append(
        "@p3",
        formatParameterAlias(this.rollupType, "mscrm.RollupType", "EnumerationType")
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
    const data = await response.json();
    return data as RollupResponse;
  }
}
