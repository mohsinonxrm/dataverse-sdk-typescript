import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveAbsoluteAndSiteCollectionUrl function
 */
export interface RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse {
  AbsoluteUrl: string;
  SiteCollectionUrl: string;
}

/**
 * RetrieveAbsoluteAndSiteCollectionUrl function
 *
 * Bound function
 * Binding parameter: entity (mscrm.sharepointsite)
 */
export class RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteFunction implements Executable<RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse> {
  constructor(public readonly sharepointsiteId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/sharepointsites(${this.sharepointsiteId})/Microsoft.Dynamics.CRM.RetrieveAbsoluteAndSiteCollectionUrl`;

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
    const data = await response.json();
    return data as RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse;
  }
}
