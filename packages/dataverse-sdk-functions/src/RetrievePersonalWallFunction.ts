import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
      params.append(
        "@p1",
        typeof this.pageNumber === "string" ? `'${this.pageNumber}'` : String(this.pageNumber)
      );
    }
    if (this.pageSize !== undefined) {
      aliases.push(`PageSize=@p2`);
      params.append(
        "@p2",
        typeof this.pageSize === "string" ? `'${this.pageSize}'` : String(this.pageSize)
      );
    }
    if (this.commentsPerPost !== undefined) {
      aliases.push(`CommentsPerPost=@p3`);
      params.append(
        "@p3",
        typeof this.commentsPerPost === "string"
          ? `'${this.commentsPerPost}'`
          : String(this.commentsPerPost)
      );
    }
    if (this.startDate !== undefined) {
      aliases.push(`StartDate=@p4`);
      params.append(
        "@p4",
        typeof this.startDate === "string" ? `'${this.startDate}'` : String(this.startDate)
      );
    }
    if (this.endDate !== undefined) {
      aliases.push(`EndDate=@p5`);
      params.append(
        "@p5",
        typeof this.endDate === "string" ? `'${this.endDate}'` : String(this.endDate)
      );
    }
    if (this.type !== undefined) {
      aliases.push(`Type=@p6`);
      params.append("@p6", typeof this.type === "string" ? `'${this.type}'` : String(this.type));
    }
    if (this.source !== undefined) {
      aliases.push(`Source=@p7`);
      params.append(
        "@p7",
        typeof this.source === "string" ? `'${this.source}'` : String(this.source)
      );
    }
    if (this.sortDirection !== undefined) {
      aliases.push(`SortDirection=@p8`);
      params.append(
        "@p8",
        typeof this.sortDirection === "string"
          ? `'${this.sortDirection}'`
          : String(this.sortDirection)
      );
    }
    if (this.keyword !== undefined) {
      aliases.push(`Keyword=@p9`);
      params.append(
        "@p9",
        typeof this.keyword === "string" ? `'${this.keyword}'` : String(this.keyword)
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

  async parseResponse(response: Response): Promise<RetrievePersonalWallResponse> {
    const data = await response.json();
    return data as RetrievePersonalWallResponse;
  }
}
