import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditPartitionDetail } from "./types/index.js";

/**
 * Response from RetrieveAuditPartitionList function
 */
export interface RetrieveAuditPartitionListResponse {
  AuditPartitionDetailCollection: AuditPartitionDetail[];
}

/**
 * RetrieveAuditPartitionList function
 *
 * Unbound function
 */
export class RetrieveAuditPartitionListFunction implements Executable<RetrieveAuditPartitionListResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAuditPartitionList`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAuditPartitionListResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAuditPartitionListResponse;
    return (await response.json()) as RetrieveAuditPartitionListResponse;
  }
}
