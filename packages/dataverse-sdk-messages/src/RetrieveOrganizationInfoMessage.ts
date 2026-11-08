import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { OrganizationInfo } from "./types/index.js";

/**
 * RetrieveOrganizationInfo request message
 *
 * Web API Function: RetrieveOrganizationInfo
 */
export class RetrieveOrganizationInfoRequest
  extends OrganizationRequest
  implements Executable<RetrieveOrganizationInfoResponse>
{
  constructor() {
    super("RetrieveOrganizationInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveOrganizationInfo`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveOrganizationInfoResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveOrganizationInfoResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveOrganizationInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveOrganizationInfoResult {
  "@odata.context"?: string;
  organizationInfo: OrganizationInfo;
}

/**
 * RetrieveOrganizationInfo response message
 *
 * `result` is the value the RetrieveOrganizationInfo function returns (see {@link RetrieveOrganizationInfoResult}).
 */
export class RetrieveOrganizationInfoResponse extends OrganizationResponse {
  constructor(public result: RetrieveOrganizationInfoResult) {
    super("RetrieveOrganizationInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveOrganizationInfoResponse {
    return new RetrieveOrganizationInfoResponse(data as RetrieveOrganizationInfoResult);
  }
}
