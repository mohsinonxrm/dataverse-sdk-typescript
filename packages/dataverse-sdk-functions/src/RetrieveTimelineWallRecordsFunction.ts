import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

/**
 * Response from the RetrieveTimelineWallRecords function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTimelineWallRecordsResponse {
  "@odata.context"?: string;
  TimelineWallRecords: string;
}

/**
 * Parameters of the RetrieveTimelineWallRecords function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveTimelineWallRecordsFunctionParameters {
  FetchXml: string;
  Target?: EntityReference;
  RollupType?: number;
}

/**
 * RetrieveTimelineWallRecords function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.activitypointer))
 */
export class RetrieveTimelineWallRecordsFunction implements Executable<RetrieveTimelineWallRecordsResponse> {
  constructor(public readonly parameters: RetrieveTimelineWallRecordsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/activitypointers/Microsoft.Dynamics.CRM.RetrieveTimelineWallRecords`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.FetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.FetchXml, "Edm.String"));
    }
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.RollupType !== undefined) {
      aliases.push(`RollupType=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.RollupType, "Edm.Int32"));
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
    return (await response.json()) as RetrieveTimelineWallRecordsResponse;
  }
}
