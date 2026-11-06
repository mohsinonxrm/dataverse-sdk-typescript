import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetAuditStorageDetailsResponse as GetAuditStorageDetailsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GetAuditStorageDetailsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GetAuditStorageDetails response message
 */
export class GetAuditStorageDetailsResponse extends OrganizationResponse {
  constructor(public result: GetAuditStorageDetailsResponseData) {
    super("GetAuditStorageDetails");
  }

  static fromResponse(data: unknown): GetAuditStorageDetailsResponse {
    return new GetAuditStorageDetailsResponse(
      responseObject<GetAuditStorageDetailsResponseData>(data)
    );
  }
}
