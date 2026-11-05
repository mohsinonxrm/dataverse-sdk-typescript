import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";
import type { AuditDetailCollection, PagingInfo } from "./types/index.js";

/**
 * Response from RetrieveRecordChangeHistory function
 */
export interface RetrieveRecordChangeHistoryResponse {
  AuditDetailCollection: AuditDetailCollection;
}

/**
 * RetrieveRecordChangeHistory function
 *
 * Unbound function
 */
export class RetrieveRecordChangeHistoryFunction implements Executable<RetrieveRecordChangeHistoryResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly pagingInfo?: PagingInfo
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRecordChangeHistory`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.target)}(${this.target.id})`,
        })
      );
    }
    if (this.pagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p2`);
      params.append("@p2", JSON.stringify(this.pagingInfo));
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

  async parseResponse(response: Response): Promise<RetrieveRecordChangeHistoryResponse> {
    const data = await response.json();
    return data as RetrieveRecordChangeHistoryResponse;
  }
}
