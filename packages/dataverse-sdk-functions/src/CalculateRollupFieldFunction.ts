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
 * CalculateRollupField function
 *
 * Unbound function
 */
export class CalculateRollupFieldFunction implements Executable<CalculateRollupFieldResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly fieldName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CalculateRollupField`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append("@p1", formatParameterAlias(this.target, "mscrm.crmbaseentity", "EntityType"));
    }
    if (this.fieldName !== undefined) {
      aliases.push(`FieldName=@p2`);
      params.append("@p2", formatParameterAlias(this.fieldName, "Edm.String"));
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
    const data = await response.json();
    return data as CalculateRollupFieldResponse;
  }
}
