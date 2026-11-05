import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { post } from "./types/index.js";

/**
 * Response from RetrievePersonalWall function
 */
export interface RetrievePersonalWallResponse {
  value: post[];
}

/**
 * RetrievePersonalWall function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.post))
 */
export class RetrievePersonalWallFunction implements Executable<RetrievePersonalWallResponse> {
  constructor(
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
    let url = `${baseUrl}/RetrievePersonalWall`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.pageNumber !== undefined) {
      aliases.push(`PageNumber=@p1`);
      params.append("@p1", formatAliasValue(this.pageNumber));
    }
    if (this.pageSize !== undefined) {
      aliases.push(`PageSize=@p2`);
      params.append("@p2", formatAliasValue(this.pageSize));
    }
    if (this.commentsPerPost !== undefined) {
      aliases.push(`CommentsPerPost=@p3`);
      params.append("@p3", formatAliasValue(this.commentsPerPost));
    }
    if (this.startDate !== undefined) {
      aliases.push(`StartDate=@p4`);
      params.append("@p4", formatAliasValue(this.startDate));
    }
    if (this.endDate !== undefined) {
      aliases.push(`EndDate=@p5`);
      params.append("@p5", formatAliasValue(this.endDate));
    }
    if (this.type !== undefined) {
      aliases.push(`Type=@p6`);
      params.append("@p6", formatAliasValue(this.type));
    }
    if (this.source !== undefined) {
      aliases.push(`Source=@p7`);
      params.append("@p7", formatAliasValue(this.source));
    }
    if (this.sortDirection !== undefined) {
      aliases.push(`SortDirection=@p8`);
      params.append("@p8", formatAliasValue(this.sortDirection));
    }
    if (this.keyword !== undefined) {
      aliases.push(`Keyword=@p9`);
      params.append("@p9", formatAliasValue(this.keyword));
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

  async parseResponse(response: Response): Promise<RetrievePersonalWallResponse> {
    const data = await response.json();
    return data as RetrievePersonalWallResponse;
  }
}
