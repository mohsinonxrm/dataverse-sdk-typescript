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
 *
 * The first argument is the id of the sharepointsite record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse;
    return (await response.json()) as RetrieveAbsoluteAndSiteCollectionUrl_sharepointsiteResponse;
  }
}
