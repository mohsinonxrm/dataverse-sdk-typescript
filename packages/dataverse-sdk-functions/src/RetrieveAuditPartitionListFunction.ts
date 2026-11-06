import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditPartitionDetail } from "./types/index.js";

/**
 * Response from the RetrieveAuditPartitionList function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAuditPartitionListResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveAuditPartitionListResponse;
  }
}
