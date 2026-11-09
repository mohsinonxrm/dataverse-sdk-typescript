import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditDetail } from "./types/index.js";

/**
 * RetrieveAuditDetails request message
 *
 * Web API Function: RetrieveAuditDetails
 *
 * The first argument is the id of the audit record to call it on.
 */
export class RetrieveAuditDetailsRequest
  extends OrganizationRequest
  implements Executable<RetrieveAuditDetailsResponse>
{
  constructor(public auditId: string) {
    super("RetrieveAuditDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/audits(${odataLiteral.guid(this.auditId)})/Microsoft.Dynamics.CRM.RetrieveAuditDetails`;

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
    return RetrieveAuditDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAuditDetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAuditDetailsResult {
  "@odata.context"?: string;
  AuditDetail: AuditDetail;
}

/**
 * RetrieveAuditDetails response message
 *
 * `result` is the value the RetrieveAuditDetails function returns (see {@link RetrieveAuditDetailsResult}).
 */
export class RetrieveAuditDetailsResponse extends OrganizationResponse {
  constructor(public result: RetrieveAuditDetailsResult) {
    super("RetrieveAuditDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAuditDetailsResponse {
    return new RetrieveAuditDetailsResponse(data as RetrieveAuditDetailsResult);
  }
}
