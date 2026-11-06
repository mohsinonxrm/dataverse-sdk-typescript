import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CalculateRollupField function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CalculateRollupFieldResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the CalculateRollupField function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CalculateRollupFieldFunctionParameters {
  Target: EntityReference;
  FieldName: string;
}

/**
 * CalculateRollupField function
 *
 * Unbound function
 */
export class CalculateRollupFieldFunction implements Executable<CalculateRollupFieldResponse> {
  constructor(public readonly parameters: CalculateRollupFieldFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CalculateRollupField`;

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
    if (this.parameters.FieldName !== undefined) {
      aliases.push(`FieldName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.FieldName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<CalculateRollupFieldResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CalculateRollupFieldResponse;
    return (await response.json()) as CalculateRollupFieldResponse;
  }
}
