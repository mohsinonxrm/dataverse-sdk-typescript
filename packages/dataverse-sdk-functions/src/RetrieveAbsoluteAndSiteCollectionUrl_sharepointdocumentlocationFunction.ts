import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveAbsoluteAndSiteCollectionUrl function
 */
export interface RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse {
  AbsoluteUrl: string;
  SiteCollectionUrl: string;
}

/**
 * RetrieveAbsoluteAndSiteCollectionUrl function
 *
 * Bound function
 * Binding parameter: entity (mscrm.sharepointdocumentlocation)
 *
 * The first argument is the id of the sharepointdocumentlocation record to call it on.
 */
export class RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationFunction implements Executable<RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse> {
  constructor(public readonly sharepointdocumentlocationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/sharepointdocumentlocations(${this.sharepointdocumentlocationId})/Microsoft.Dynamics.CRM.RetrieveAbsoluteAndSiteCollectionUrl`;

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse;
    return (await response.json()) as RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse;
  }
}
