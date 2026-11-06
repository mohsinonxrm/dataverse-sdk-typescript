import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditDetail } from "./types/index.js";

/**
 * Response from the RetrieveAuditDetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAuditDetailsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveAuditDetailsResponse;
  }
}
