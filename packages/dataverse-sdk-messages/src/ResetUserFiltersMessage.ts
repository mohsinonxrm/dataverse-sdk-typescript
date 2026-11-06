import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ResetUserFilters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ResetUserFiltersRequestParameters {
  QueryType: number;
}

/**
 * ResetUserFilters request message
 *
 * Web API Action: ResetUserFilters
 */
export class ResetUserFiltersRequest
  extends OrganizationRequest
  implements Executable<ResetUserFiltersResponse>
{
  declare readonly Parameters: Readonly<ResetUserFiltersRequestParameters>;

  constructor(parameters: ResetUserFiltersRequestParameters) {
    super("ResetUserFilters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ResetUserFilters`;

    const body = requestBody({
      QueryType: this.Parameters.QueryType,
    });

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
