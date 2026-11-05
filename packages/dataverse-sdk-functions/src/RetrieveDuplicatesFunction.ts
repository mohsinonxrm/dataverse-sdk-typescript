import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { PagingInfo } from "./types/index.js";

/**
 * Response from RetrieveDuplicates function
 */
export interface RetrieveDuplicatesResponse {
  value: EntityReference[];
}

/**
 * RetrieveDuplicates function
 *
 * Unbound function
 */
export class RetrieveDuplicatesFunction implements Executable<RetrieveDuplicatesResponse> {
  constructor(
    public readonly businessEntity: EntityReference,
    public readonly matchingEntityName: string,
    public readonly pagingInfo?: PagingInfo
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDuplicates`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.businessEntity !== undefined) {
      aliases.push(`BusinessEntity=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.businessEntity, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.matchingEntityName !== undefined) {
      aliases.push(`MatchingEntityName=@p2`);
      params.append("@p2", formatParameterAlias(this.matchingEntityName, "Edm.String"));
    }
    if (this.pagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p3`);
      params.append("@p3", JSON.stringify(this.pagingInfo));
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

  async parseResponse(response: Response): Promise<RetrieveDuplicatesResponse> {
    const data = await response.json();
    return data as RetrieveDuplicatesResponse;
  }
}
