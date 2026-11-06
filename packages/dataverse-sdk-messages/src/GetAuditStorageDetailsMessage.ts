import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AuditStorageDetailsResult } from "./types/index.js";

/**
 * GetAuditStorageDetails request message
 *
 * Web API Action: GetAuditStorageDetails
 */
export class GetAuditStorageDetailsRequest
  extends OrganizationRequest
  implements Executable<GetAuditStorageDetailsResponse>
{
  constructor() {
    super("GetAuditStorageDetails");
  }

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
    return GetAuditStorageDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetAuditStorageDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetAuditStorageDetailsResult {
  "@odata.context"?: string;
  Result: AuditStorageDetailsResult;
}

/**
 * GetAuditStorageDetails response message
 *
 * `result` is the value the GetAuditStorageDetails action returns (see {@link GetAuditStorageDetailsResult}).
 */
export class GetAuditStorageDetailsResponse extends OrganizationResponse {
  constructor(public result: GetAuditStorageDetailsResult) {
    super("GetAuditStorageDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetAuditStorageDetailsResponse {
    return new GetAuditStorageDetailsResponse(data as GetAuditStorageDetailsResult);
  }
}
