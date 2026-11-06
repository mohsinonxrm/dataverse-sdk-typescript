import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { post } from "./types/index.js";

/**
 * Response from RetrieveRecordWall function
 */
export interface RetrieveRecordWallResponse {
  value: post[];
}

/**
 * RetrieveRecordWall function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.post))
 */
export class RetrieveRecordWallFunction implements Executable<RetrieveRecordWallResponse> {
  constructor(
    public readonly entity: EntityReference,
    public readonly pageNumber: number,
    public readonly pageSize: number,
    public readonly commentsPerPost: number,
    public readonly startDate?: string | Date,
    public readonly endDate?: string | Date,
    public readonly type?: number,
    public readonly source?: number,
    public readonly sortDirection?: boolean,
    public readonly keyword?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/posts/Microsoft.Dynamics.CRM.RetrieveRecordWall`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entity !== undefined) {
      aliases.push(`Entity=@p1`);
      params.append("@p1", formatParameterAlias(this.entity, "mscrm.crmbaseentity", "EntityType"));
    }
    if (this.pageNumber !== undefined) {
      aliases.push(`PageNumber=@p2`);
      params.append("@p2", formatParameterAlias(this.pageNumber, "Edm.Int32"));
    }
    if (this.pageSize !== undefined) {
      aliases.push(`PageSize=@p3`);
      params.append("@p3", formatParameterAlias(this.pageSize, "Edm.Int32"));
    }
    if (this.commentsPerPost !== undefined) {
      aliases.push(`CommentsPerPost=@p4`);
      params.append("@p4", formatParameterAlias(this.commentsPerPost, "Edm.Int32"));
    }
    if (this.startDate !== undefined) {
      aliases.push(`StartDate=@p5`);
      params.append("@p5", formatParameterAlias(this.startDate, "Edm.DateTimeOffset"));
    }
    if (this.endDate !== undefined) {
      aliases.push(`EndDate=@p6`);
      params.append("@p6", formatParameterAlias(this.endDate, "Edm.DateTimeOffset"));
    }
    if (this.type !== undefined) {
      aliases.push(`Type=@p7`);
      params.append("@p7", formatParameterAlias(this.type, "Edm.Int32"));
    }
    if (this.source !== undefined) {
      aliases.push(`Source=@p8`);
      params.append("@p8", formatParameterAlias(this.source, "Edm.Int32"));
    }
    if (this.sortDirection !== undefined) {
      aliases.push(`SortDirection=@p9`);
      params.append("@p9", formatParameterAlias(this.sortDirection, "Edm.Boolean"));
    }
    if (this.keyword !== undefined) {
      aliases.push(`Keyword=@p10`);
      params.append("@p10", formatParameterAlias(this.keyword, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveRecordWallResponse> {
    const data = await response.json();
    return data as RetrieveRecordWallResponse;
  }
}
