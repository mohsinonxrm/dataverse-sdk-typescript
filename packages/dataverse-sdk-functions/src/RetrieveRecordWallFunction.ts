import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";
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
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly type: number,
    public readonly source: number,
    public readonly sortDirection: boolean,
    public readonly keyword: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/posts/Microsoft.Dynamics.CRM.RetrieveRecordWall`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entity !== undefined) {
      aliases.push(`Entity=@p1`);
      params.append(
        "@p1",
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.entity)}(${this.entity.id})`,
        })
      );
    }
    if (this.pageNumber !== undefined) {
      aliases.push(`PageNumber=@p2`);
      params.append("@p2", formatAliasValue(this.pageNumber));
    }
    if (this.pageSize !== undefined) {
      aliases.push(`PageSize=@p3`);
      params.append("@p3", formatAliasValue(this.pageSize));
    }
    if (this.commentsPerPost !== undefined) {
      aliases.push(`CommentsPerPost=@p4`);
      params.append("@p4", formatAliasValue(this.commentsPerPost));
    }
    if (this.startDate !== undefined) {
      aliases.push(`StartDate=@p5`);
      params.append("@p5", formatAliasValue(this.startDate));
    }
    if (this.endDate !== undefined) {
      aliases.push(`EndDate=@p6`);
      params.append("@p6", formatAliasValue(this.endDate));
    }
    if (this.type !== undefined) {
      aliases.push(`Type=@p7`);
      params.append("@p7", formatAliasValue(this.type));
    }
    if (this.source !== undefined) {
      aliases.push(`Source=@p8`);
      params.append("@p8", formatAliasValue(this.source));
    }
    if (this.sortDirection !== undefined) {
      aliases.push(`SortDirection=@p9`);
      params.append("@p9", formatAliasValue(this.sortDirection));
    }
    if (this.keyword !== undefined) {
      aliases.push(`Keyword=@p10`);
      params.append("@p10", formatAliasValue(this.keyword));
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
