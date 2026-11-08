import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveAbsoluteAndSiteCollectionUrl function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse {
  "@odata.context"?: string;
  AbsoluteUrl: string;
  SiteCollectionUrl: string;
}

/**
 * RetrieveAbsoluteAndSiteCollectionUrl function
 *
 * Bound function
 * Binding parameter: entity (mscrm.sharepointsite)
 *
 * The first argument is the id of the sharepointsite record to call it on.
 */
export class RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteFunction implements Executable<RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse> {
  constructor(public readonly sharepointsiteId: string) {}

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
    return (await response.json()) as RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse;
  }
}
