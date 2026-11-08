import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the CalculateRollupField message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CalculateRollupFieldRequestParameters {
  Target: EntityReference;
  FieldName: string;
}

/**
 * CalculateRollupField request message
 *
 * Web API Function: CalculateRollupField
 */
export class CalculateRollupFieldRequest
  extends OrganizationRequest
  implements Executable<CalculateRollupFieldResponse>
{
  declare readonly Parameters: Readonly<CalculateRollupFieldRequestParameters>;

  constructor(parameters: CalculateRollupFieldRequestParameters) {
    super("CalculateRollupField", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CalculateRollupField`;

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
    if (this.Parameters.FieldName !== undefined) {
      aliases.push(`FieldName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.FieldName, "Edm.String"));
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CalculateRollupFieldResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CalculateRollupFieldResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CalculateRollupField function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CalculateRollupFieldResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * CalculateRollupField response message
 *
 * `result` is the value the CalculateRollupField function returns (see {@link CalculateRollupFieldResult}).
 */
export class CalculateRollupFieldResponse extends OrganizationResponse {
  constructor(public result: CalculateRollupFieldResult) {
    super("CalculateRollupField");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CalculateRollupFieldResponse {
    return new CalculateRollupFieldResponse((data ?? null) as CalculateRollupFieldResult);
  }
}
