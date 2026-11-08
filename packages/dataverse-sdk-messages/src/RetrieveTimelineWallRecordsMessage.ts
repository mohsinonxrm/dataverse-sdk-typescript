import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveTimelineWallRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveTimelineWallRecordsRequestParameters {
  FetchXml: string;
  Target?: EntityReference;
  RollupType?: number;
}

/**
 * RetrieveTimelineWallRecords request message
 *
 * Web API Function: RetrieveTimelineWallRecords
 */
export class RetrieveTimelineWallRecordsRequest
  extends OrganizationRequest
  implements Executable<RetrieveTimelineWallRecordsResponse>
{
  declare readonly Parameters: Readonly<RetrieveTimelineWallRecordsRequestParameters>;

  constructor(parameters: RetrieveTimelineWallRecordsRequestParameters) {
    super("RetrieveTimelineWallRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/activitypointers/Microsoft.Dynamics.CRM.RetrieveTimelineWallRecords`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.FetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.FetchXml, "Edm.String"));
    }
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.RollupType !== undefined) {
      aliases.push(`RollupType=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.RollupType, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<RetrieveTimelineWallRecordsResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveTimelineWallRecordsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveTimelineWallRecords function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTimelineWallRecordsResult {
  "@odata.context"?: string;
  TimelineWallRecords: string;
}

/**
 * RetrieveTimelineWallRecords response message
 *
 * `result` is the value the RetrieveTimelineWallRecords function returns (see {@link RetrieveTimelineWallRecordsResult}).
 */
export class RetrieveTimelineWallRecordsResponse extends OrganizationResponse {
  constructor(public result: RetrieveTimelineWallRecordsResult) {
    super("RetrieveTimelineWallRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveTimelineWallRecordsResponse {
    return new RetrieveTimelineWallRecordsResponse(data as RetrieveTimelineWallRecordsResult);
  }
}
