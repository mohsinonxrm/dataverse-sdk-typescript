import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditStorageDetailsResult } from "./types/index.js";

/**
 * Response from the GetAuditStorageDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetAuditStorageDetailsResponse {
  "@odata.context"?: string;
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetAuditStorageDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetAuditStorageDetailsResponse;
  }
}
