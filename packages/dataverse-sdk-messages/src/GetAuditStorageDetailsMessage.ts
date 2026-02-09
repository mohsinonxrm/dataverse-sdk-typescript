import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetAuditStorageDetailsResponse> {
    const data = await response.json();
    return GetAuditStorageDetailsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * GetAuditStorageDetails response message
 */
export class GetAuditStorageDetailsResponse extends OrganizationResponse {
  constructor(public result: GetAuditStorageDetailsResponse) {
    super("GetAuditStorageDetails");
  }

  static fromResponse(data: unknown): GetAuditStorageDetailsResponse {
    return new GetAuditStorageDetailsResponse((data as any).value);
  }
}
