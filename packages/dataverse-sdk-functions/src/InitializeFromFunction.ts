import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { TargetFieldType } from "./types/index.js";

/**
 * Response from the InitializeFrom function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type InitializeFromResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the InitializeFrom function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeFromFunctionParameters {
  EntityMoniker: EntityReference;
  SkipParentalRelationshipMapping?: boolean;
  TargetEntityName: string;
  TargetFieldType: TargetFieldType | keyof typeof TargetFieldType;
  RetrieveConsumableRecord?: boolean;
}

/**
 * InitializeFrom function
 *
 * Unbound function
 */
export class InitializeFromFunction implements Executable<InitializeFromResponse> {
  constructor(public readonly parameters: InitializeFromFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InitializeFrom`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityMoniker !== undefined) {
      aliases.push(`EntityMoniker=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.EntityMoniker, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.SkipParentalRelationshipMapping !== undefined) {
      aliases.push(`SkipParentalRelationshipMapping=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.SkipParentalRelationshipMapping, "Edm.Boolean")
      );
    }
    if (this.parameters.TargetEntityName !== undefined) {
      aliases.push(`TargetEntityName=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.TargetEntityName, "Edm.String"));
    }
    if (this.parameters.TargetFieldType !== undefined) {
      aliases.push(`TargetFieldType=@p4`);
      params.append(
        "@p4",
        formatParameterAlias(
          this.parameters.TargetFieldType,
          "mscrm.TargetFieldType",
          "EnumerationType"
        )
      );
    }
    if (this.parameters.RetrieveConsumableRecord !== undefined) {
      aliases.push(`RetrieveConsumableRecord=@p5`);
      params.append(
        "@p5",
        formatParameterAlias(this.parameters.RetrieveConsumableRecord, "Edm.Boolean")
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as InitializeFromResponse;
  }
}
