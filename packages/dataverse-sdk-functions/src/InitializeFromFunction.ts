import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";
import type { TargetFieldType } from "./types/index.js";

/**
 * Response from InitializeFrom function
 */
export interface InitializeFromResponse {
  value: EntityReference;
}

/**
 * InitializeFrom function
 *
 * Unbound function
 */
export class InitializeFromFunction implements Executable<InitializeFromResponse> {
  constructor(
    public readonly entityMoniker: EntityReference,
    public readonly skipParentalRelationshipMapping: boolean,
    public readonly targetEntityName: string,
    public readonly targetFieldType: TargetFieldType,
    public readonly retrieveConsumableRecord: boolean
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
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.entityMoniker)}(${this.entityMoniker.id})`,
        })
      );
    }
    if (this.skipParentalRelationshipMapping !== undefined) {
      aliases.push(`SkipParentalRelationshipMapping=@p2`);
      params.append(
        "@p2",
        typeof this.skipParentalRelationshipMapping === "string"
          ? `'${this.skipParentalRelationshipMapping}'`
          : String(this.skipParentalRelationshipMapping)
      );
    }
    if (this.targetEntityName !== undefined) {
      aliases.push(`TargetEntityName=@p3`);
      params.append(
        "@p3",
        typeof this.targetEntityName === "string"
          ? `'${this.targetEntityName}'`
          : String(this.targetEntityName)
      );
    }
    if (this.targetFieldType !== undefined) {
      aliases.push(`TargetFieldType=@p4`);
      params.append(
        "@p4",
        typeof this.targetFieldType === "string"
          ? `'${this.targetFieldType}'`
          : String(this.targetFieldType)
      );
    }
    if (this.retrieveConsumableRecord !== undefined) {
      aliases.push(`RetrieveConsumableRecord=@p5`);
      params.append(
        "@p5",
        typeof this.retrieveConsumableRecord === "string"
          ? `'${this.retrieveConsumableRecord}'`
          : String(this.retrieveConsumableRecord)
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

  async parseResponse(response: Response): Promise<InitializeFromResponse> {
    const data = await response.json();
    return data as InitializeFromResponse;
  }
}
