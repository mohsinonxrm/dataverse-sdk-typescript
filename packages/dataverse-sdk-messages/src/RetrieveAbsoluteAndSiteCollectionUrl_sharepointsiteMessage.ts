import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveAbsoluteAndSiteCollectionUrl request message
 *
 * Web API Function: RetrieveAbsoluteAndSiteCollectionUrl
 *
 * The first argument is the id of the sharepointsite record to call it on.
 */
export class RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteRequest
  extends OrganizationRequest
  implements Executable<RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse>
{
  constructor(public sharepointsiteId: string) {
    super("RetrieveAbsoluteAndSiteCollectionUrl");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/sharepointsites(${odataLiteral.guid(this.sharepointsiteId)})/Microsoft.Dynamics.CRM.RetrieveAbsoluteAndSiteCollectionUrl`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrieveAbsoluteAndSiteCollectionUrl function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResult {
  "@odata.context"?: string;
  AbsoluteUrl: string;
  SiteCollectionUrl: string;
}

/**
 * RetrieveAbsoluteAndSiteCollectionUrl response message
 *
 * `result` is the value the RetrieveAbsoluteAndSiteCollectionUrl function returns (see {@link RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResult}).
 */
export class RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse extends OrganizationResponse {
  constructor(public result: RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResult) {
    super("RetrieveAbsoluteAndSiteCollectionUrl");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse {
    return new RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse(
      data as RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResult
    );
  }
}
