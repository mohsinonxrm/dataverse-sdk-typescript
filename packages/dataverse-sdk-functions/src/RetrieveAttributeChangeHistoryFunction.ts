import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { AuditDetailCollection, PagingInfo } from "./types/index.js";

/**
 * Response from RetrieveAttributeChangeHistory function
 */
export interface RetrieveAttributeChangeHistoryResponse {
  AuditDetailCollection: AuditDetailCollection;
}

/**
 * RetrieveAttributeChangeHistory function
 *
 * Unbound function
 */
export class RetrieveAttributeChangeHistoryFunction implements Executable<RetrieveAttributeChangeHistoryResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly attributeLogicalName: string,
    public readonly pagingInfo?: PagingInfo
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAttributeChangeHistory`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append("@p1", formatParameterAlias(this.target, "mscrm.crmbaseentity", "EntityType"));
    }
    if (this.attributeLogicalName !== undefined) {
      aliases.push(`AttributeLogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.attributeLogicalName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveAttributeChangeHistoryResponse> {
    const data = await response.json();
    return data as RetrieveAttributeChangeHistoryResponse;
  }
}
