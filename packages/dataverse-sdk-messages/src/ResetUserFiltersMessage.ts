import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ResetUserFilters request message
 *
 * Web API Action: ResetUserFilters
 */
export class ResetUserFiltersRequest
  extends OrganizationRequest
  implements Executable<ResetUserFiltersResponse>
{
  constructor(public queryType: number) {
    super("ResetUserFilters");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ResetUserFilters`;

    const body: Record<string, unknown> = {
      QueryType: this.queryType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ResetUserFiltersResponse> {
    // No return value (204 No Content)
    return new ResetUserFiltersResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      QueryType: this.queryType,
    };
  }
}

/**
 * ResetUserFilters response message
 */
export class ResetUserFiltersResponse extends OrganizationResponse {
  constructor() {
    super("ResetUserFilters");
  }

  static fromResponse(_data: unknown): ResetUserFiltersResponse {
    return new ResetUserFiltersResponse();
  }
}
