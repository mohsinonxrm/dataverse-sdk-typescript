import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveTimelineWallRecords function
 */
export interface RetrieveTimelineWallRecordsResponse {
  TimelineWallRecords: string;
}

/**
 * RetrieveTimelineWallRecords function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.activitypointer))
 */
export class RetrieveTimelineWallRecordsFunction implements Executable<RetrieveTimelineWallRecordsResponse> {
  constructor(
    public readonly fetchXml: string,
    public readonly target?: EntityReference,
    public readonly rollupType?: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/activitypointers/Microsoft.Dynamics.CRM.RetrieveTimelineWallRecords`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.fetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append("@p1", formatParameterAlias(this.fetchXml, "Edm.String"));
    }
    if (this.target !== undefined) {
      aliases.push(`Target=@p2`);
      params.append(
        "@p2",
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.target)}(${this.target.id})`,
        })
      );
    }
    if (this.rollupType !== undefined) {
      aliases.push(`RollupType=@p3`);
      params.append("@p3", formatParameterAlias(this.rollupType, "Edm.Int32"));
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
    const data = await response.json();
    return data as RetrieveTimelineWallRecordsResponse;
  }
}
