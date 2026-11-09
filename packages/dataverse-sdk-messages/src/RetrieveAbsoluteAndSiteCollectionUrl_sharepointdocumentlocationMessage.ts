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
 * The first argument is the id of the sharepointdocumentlocation record to call it on.
 */
export class RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationRequest
  extends OrganizationRequest
  implements Executable<RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse>
{
  constructor(public sharepointdocumentlocationId: string) {
    super("RetrieveAbsoluteAndSiteCollectionUrl");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/sharepointdocumentlocations(${odataLiteral.guid(this.sharepointdocumentlocationId)})/Microsoft.Dynamics.CRM.RetrieveAbsoluteAndSiteCollectionUrl`;

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
  ): Promise<RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrieveAbsoluteAndSiteCollectionUrl function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResult {
  "@odata.context"?: string;
  AbsoluteUrl: string;
  SiteCollectionUrl: string;
}

/**
 * RetrieveAbsoluteAndSiteCollectionUrl response message
 *
 * `result` is the value the RetrieveAbsoluteAndSiteCollectionUrl function returns (see {@link RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResult}).
 */
export class RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse extends OrganizationResponse {
  constructor(
    public result: RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResult
  ) {
    super("RetrieveAbsoluteAndSiteCollectionUrl");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse {
    return new RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse(
      data as RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResult
    );
  }
}
