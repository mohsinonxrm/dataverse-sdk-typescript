import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { post } from "./types/index.js";

/**
 * Response from the RetrieveRecordWall function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveRecordWallResponse = Array<
  post & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * Parameters of the RetrieveRecordWall function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveRecordWallFunctionParameters {
  Entity: EntityReference;
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
 * RetrieveRecordWall function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.post))
 */
export class RetrieveRecordWallFunction implements Executable<RetrieveRecordWallResponse> {
  constructor(public readonly parameters: RetrieveRecordWallFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/posts/Microsoft.Dynamics.CRM.RetrieveRecordWall`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Entity !== undefined) {
      aliases.push(`Entity=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Entity, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.PageNumber !== undefined) {
      aliases.push(`PageNumber=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.PageNumber, "Edm.Int32"));
    }
    if (this.parameters.PageSize !== undefined) {
      aliases.push(`PageSize=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.PageSize, "Edm.Int32"));
    }
    if (this.parameters.CommentsPerPost !== undefined) {
      aliases.push(`CommentsPerPost=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.CommentsPerPost, "Edm.Int32"));
    }
    if (this.parameters.StartDate !== undefined) {
      aliases.push(`StartDate=@p5`);
      params.append("@p5", formatParameterAlias(this.parameters.StartDate, "Edm.DateTimeOffset"));
    }
    if (this.parameters.EndDate !== undefined) {
      aliases.push(`EndDate=@p6`);
      params.append("@p6", formatParameterAlias(this.parameters.EndDate, "Edm.DateTimeOffset"));
    }
    if (this.parameters.Type !== undefined) {
      aliases.push(`Type=@p7`);
      params.append("@p7", formatParameterAlias(this.parameters.Type, "Edm.Int32"));
    }
    if (this.parameters.Source !== undefined) {
      aliases.push(`Source=@p8`);
      params.append("@p8", formatParameterAlias(this.parameters.Source, "Edm.Int32"));
    }
    if (this.parameters.SortDirection !== undefined) {
      aliases.push(`SortDirection=@p9`);
      params.append("@p9", formatParameterAlias(this.parameters.SortDirection, "Edm.Boolean"));
    }
    if (this.parameters.Keyword !== undefined) {
      aliases.push(`Keyword=@p10`);
      params.append("@p10", formatParameterAlias(this.parameters.Keyword, "Edm.String"));
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveRecordWallResponse }).value;
  }
}
