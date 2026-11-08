import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { TargetFieldType } from "./types/index.js";

/**
 * Parameters of the InitializeFrom message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeFromRequestParameters {
  EntityMoniker: EntityReference;
  SkipParentalRelationshipMapping?: boolean;
  TargetEntityName: string;
  TargetFieldType: TargetFieldType | keyof typeof TargetFieldType;
  RetrieveConsumableRecord?: boolean;
}

/**
 * InitializeFrom request message
 *
 * Web API Function: InitializeFrom
 */
export class InitializeFromRequest
  extends OrganizationRequest
  implements Executable<InitializeFromResponse>
{
  declare readonly Parameters: Readonly<InitializeFromRequestParameters>;

  constructor(parameters: InitializeFromRequestParameters) {
    super("InitializeFrom", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InitializeFrom`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityMoniker !== undefined) {
      aliases.push(`EntityMoniker=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.EntityMoniker, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.SkipParentalRelationshipMapping !== undefined) {
      aliases.push(`SkipParentalRelationshipMapping=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.SkipParentalRelationshipMapping, "Edm.Boolean")
      );
    }
    if (this.Parameters.TargetEntityName !== undefined) {
      aliases.push(`TargetEntityName=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.TargetEntityName, "Edm.String"));
    }
    if (this.Parameters.TargetFieldType !== undefined) {
      aliases.push(`TargetFieldType=@p4`);
      params.append(
        "@p4",
        formatParameterAlias(
          this.Parameters.TargetFieldType,
          "mscrm.TargetFieldType",
          "EnumerationType"
        )
      );
    }
    if (this.Parameters.RetrieveConsumableRecord !== undefined) {
      aliases.push(`RetrieveConsumableRecord=@p5`);
      params.append(
        "@p5",
        formatParameterAlias(this.Parameters.RetrieveConsumableRecord, "Edm.Boolean")
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
    if (response.status === 204) return InitializeFromResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return InitializeFromResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeFrom function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type InitializeFromResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * InitializeFrom response message
 *
 * `result` is the value the InitializeFrom function returns (see {@link InitializeFromResult}).
 */
export class InitializeFromResponse extends OrganizationResponse {
  constructor(public result: InitializeFromResult) {
    super("InitializeFrom");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeFromResponse {
    return new InitializeFromResponse((data ?? null) as InitializeFromResult);
  }
}
