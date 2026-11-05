import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from CalculateRollupField function
 */
export interface CalculateRollupFieldResponse {
  value: EntityReference;
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
      params.append(
        "@p1",
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.target)}(${this.target.id})`,
        })
      );
    }
    if (this.fieldName !== undefined) {
      aliases.push(`FieldName=@p2`);
      params.append("@p2", formatAliasValue(this.fieldName));
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
