import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { OrganizationResources } from "./types/index.js";

/**
 * RetrieveOrganizationResources request message
 *
 * Web API Function: RetrieveOrganizationResources
 */
export class RetrieveOrganizationResourcesRequest
  extends OrganizationRequest
  implements Executable<RetrieveOrganizationResourcesResponse>
{
  constructor() {
    super("RetrieveOrganizationResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveOrganizationResources`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveOrganizationResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveOrganizationResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveOrganizationResources function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveOrganizationResourcesResult {
  "@odata.context"?: string;
  OrganizationResources: OrganizationResources;
}

/**
 * RetrieveOrganizationResources response message
 *
 * `result` is the value the RetrieveOrganizationResources function returns (see {@link RetrieveOrganizationResourcesResult}).
 */
export class RetrieveOrganizationResourcesResponse extends OrganizationResponse {
  constructor(public result: RetrieveOrganizationResourcesResult) {
    super("RetrieveOrganizationResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveOrganizationResourcesResponse {
    return new RetrieveOrganizationResourcesResponse(data as RetrieveOrganizationResourcesResult);
  }
}
