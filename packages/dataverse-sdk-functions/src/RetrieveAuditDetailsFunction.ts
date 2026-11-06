import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditDetail } from "./types/index.js";

/**
 * Response from RetrieveAuditDetails function
 */
export interface RetrieveAuditDetailsResponse {
  AuditDetail: AuditDetail;
}

/**
 * RetrieveAuditDetails function
 *
 * Bound function
 * Binding parameter: entity (mscrm.audit)
 *
 * The first argument is the id of the audit record to call it on.
 */
export class RetrieveAuditDetailsFunction implements Executable<RetrieveAuditDetailsResponse> {
  constructor(public readonly auditId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/audits(${this.auditId})/Microsoft.Dynamics.CRM.RetrieveAuditDetails`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAuditDetailsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveAuditDetailsResponse;
  }
}
