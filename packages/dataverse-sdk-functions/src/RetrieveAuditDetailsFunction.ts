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
    const data = await response.json();
    return data as RetrieveAuditDetailsResponse;
  }
}
