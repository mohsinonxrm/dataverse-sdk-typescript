import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { post } from "./types/index.js";

/**
 * Parameters of the RetrievePersonalWall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrievePersonalWallRequestParameters {
  PageNumber: number;
  PageSize: number;
  CommentsPerPost: number;
  StartDate?: string | Date;
  EndDate?: string | Date;
  Type?: number;
  Source?: number;
  SortDirection?: boolean;
  Keyword?: string;
}

/**
 * RetrievePersonalWall request message
 *
 * Web API Function: RetrievePersonalWall
 */
export class RetrievePersonalWallRequest
  extends OrganizationRequest
  implements Executable<RetrievePersonalWallResponse>
{
  declare readonly Parameters: Readonly<RetrievePersonalWallRequestParameters>;

  constructor(parameters: RetrievePersonalWallRequestParameters) {
    super("RetrievePersonalWall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/posts/Microsoft.Dynamics.CRM.RetrievePersonalWall`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.PageNumber !== undefined) {
      aliases.push(`PageNumber=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.PageNumber, "Edm.Int32"));
    }
    if (this.Parameters.PageSize !== undefined) {
      aliases.push(`PageSize=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.PageSize, "Edm.Int32"));
    }
    if (this.Parameters.CommentsPerPost !== undefined) {
      aliases.push(`CommentsPerPost=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.CommentsPerPost, "Edm.Int32"));
    }
    if (this.Parameters.StartDate !== undefined) {
      aliases.push(`StartDate=@p4`);
      params.append("@p4", formatParameterAlias(this.Parameters.StartDate, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.EndDate !== undefined) {
      aliases.push(`EndDate=@p5`);
      params.append("@p5", formatParameterAlias(this.Parameters.EndDate, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.Type !== undefined) {
      aliases.push(`Type=@p6`);
      params.append("@p6", formatParameterAlias(this.Parameters.Type, "Edm.Int32"));
    }
    if (this.Parameters.Source !== undefined) {
      aliases.push(`Source=@p7`);
      params.append("@p7", formatParameterAlias(this.Parameters.Source, "Edm.Int32"));
    }
    if (this.Parameters.SortDirection !== undefined) {
      aliases.push(`SortDirection=@p8`);
      params.append("@p8", formatParameterAlias(this.Parameters.SortDirection, "Edm.Boolean"));
    }
    if (this.Parameters.Keyword !== undefined) {
      aliases.push(`Keyword=@p9`);
      params.append("@p9", formatParameterAlias(this.Parameters.Keyword, "Edm.String"));
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrievePersonalWallResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrievePersonalWallResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePersonalWall function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrievePersonalWallResult = Array<
  post & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrievePersonalWall response message
 *
 * `result` is the value the RetrievePersonalWall function returns (see {@link RetrievePersonalWallResult}).
 */
export class RetrievePersonalWallResponse extends OrganizationResponse {
  constructor(public result: RetrievePersonalWallResult) {
    super("RetrievePersonalWall");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePersonalWallResponse {
    return new RetrievePersonalWallResponse(
      data === undefined ? [] : (data as { value: RetrievePersonalWallResult }).value
    );
  }
}
