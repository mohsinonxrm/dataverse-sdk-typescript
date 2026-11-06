import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { AuditDetailCollection, PagingInfo } from "./types/index.js";

/**
 * Response from RetrieveRecordChangeHistory function
 */
export interface RetrieveRecordChangeHistoryResponse {
  AuditDetailCollection: AuditDetailCollection;
}

/**
 * Parameters of the RetrieveRecordChangeHistory function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveRecordChangeHistoryFunctionParameters {
  Target: EntityReference;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveRecordChangeHistory function
 *
 * Unbound function
 */
export class RetrieveRecordChangeHistoryFunction implements Executable<RetrieveRecordChangeHistoryResponse> {
  constructor(public readonly parameters: RetrieveRecordChangeHistoryFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRecordChangeHistory`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.PagingInfo));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveRecordChangeHistoryResponse;
    return (await response.json()) as RetrieveRecordChangeHistoryResponse;
  }
}
