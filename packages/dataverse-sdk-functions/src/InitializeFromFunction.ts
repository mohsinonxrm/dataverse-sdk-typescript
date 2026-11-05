import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { TargetFieldType } from "./types/index.js";

/**
 * Response from InitializeFrom function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface InitializeFromResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * InitializeFrom function
 *
 * Unbound function
 */
export class InitializeFromFunction implements Executable<InitializeFromResponse> {
  constructor(
    public readonly entityMoniker: EntityReference,
    public readonly skipParentalRelationshipMapping: boolean | undefined,
    public readonly targetEntityName: string,
    public readonly targetFieldType: TargetFieldType | keyof typeof TargetFieldType,
    public readonly retrieveConsumableRecord?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InitializeFrom`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityMoniker !== undefined) {
      aliases.push(`EntityMoniker=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.entityMoniker, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.skipParentalRelationshipMapping !== undefined) {
      aliases.push(`SkipParentalRelationshipMapping=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.skipParentalRelationshipMapping, "Edm.Boolean")
      );
    }
    if (this.targetEntityName !== undefined) {
      aliases.push(`TargetEntityName=@p3`);
      params.append("@p3", formatParameterAlias(this.targetEntityName, "Edm.String"));
    }
    if (this.targetFieldType !== undefined) {
      aliases.push(`TargetFieldType=@p4`);
      params.append(
        "@p4",
        formatParameterAlias(this.targetFieldType, "mscrm.TargetFieldType", "EnumerationType")
      );
    }
    if (this.retrieveConsumableRecord !== undefined) {
      aliases.push(`RetrieveConsumableRecord=@p5`);
      params.append("@p5", formatParameterAlias(this.retrieveConsumableRecord, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<InitializeFromResponse> {
    const data = await response.json();
    return data as InitializeFromResponse;
  }
}
