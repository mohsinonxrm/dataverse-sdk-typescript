import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditPartitionDetail } from "./types/index.js";

/**
 * RetrieveAuditPartitionList request message
 *
 * Web API Function: RetrieveAuditPartitionList
 */
export class RetrieveAuditPartitionListRequest
  extends OrganizationRequest
  implements Executable<RetrieveAuditPartitionListResponse>
{
  constructor() {
    super("RetrieveAuditPartitionList");
  }

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
    return RetrieveAuditPartitionListResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAuditPartitionList function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAuditPartitionListResult {
  "@odata.context"?: string;
  AuditPartitionDetailCollection: AuditPartitionDetail[];
}

/**
 * RetrieveAuditPartitionList response message
 *
 * `result` is the value the RetrieveAuditPartitionList function returns (see {@link RetrieveAuditPartitionListResult}).
 */
export class RetrieveAuditPartitionListResponse extends OrganizationResponse {
  constructor(public result: RetrieveAuditPartitionListResult) {
    super("RetrieveAuditPartitionList");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAuditPartitionListResponse {
    return new RetrieveAuditPartitionListResponse(data as RetrieveAuditPartitionListResult);
  }
}
