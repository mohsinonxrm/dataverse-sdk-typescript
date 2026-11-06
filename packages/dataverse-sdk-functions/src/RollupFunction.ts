import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { RollupType, TypedQueryBase } from "./types/index.js";

/**
 * Response from Rollup function
 */
export interface RollupResponse {
  value: EntityReference[];
}

/**
 * Parameters of the Rollup function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RollupFunctionParameters {
  Target: EntityReference;
  Query?: TypedQueryBase;
  RollupType: RollupType | keyof typeof RollupType;
}

/**
 * Rollup function
 *
 * Unbound function
 */
export class RollupFunction implements Executable<RollupResponse> {
  constructor(public readonly parameters: RollupFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Rollup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.Query !== undefined) {
      aliases.push(`Query=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.Query));
    }
    if (this.parameters.RollupType !== undefined) {
      aliases.push(`RollupType=@p3`);
      params.append(
        "@p3",
        formatParameterAlias(this.parameters.RollupType, "mscrm.RollupType", "EnumerationType")
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RollupResponse;
    return (await response.json()) as RollupResponse;
  }
}
