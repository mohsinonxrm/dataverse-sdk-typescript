import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditStorageDetailsResult } from "./types/index.js";

/**
 * Response from GetAuditStorageDetails action
 */
export interface GetAuditStorageDetailsResponse {
  Result: AuditStorageDetailsResult;
}

/**
 * GetAuditStorageDetails action
 *
 * Unbound action
 */
export class GetAuditStorageDetailsAction implements Executable<GetAuditStorageDetailsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetAuditStorageDetails`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetAuditStorageDetailsResponse> {
    const data = await response.json();
    return data as GetAuditStorageDetailsResponse;
  }
}
