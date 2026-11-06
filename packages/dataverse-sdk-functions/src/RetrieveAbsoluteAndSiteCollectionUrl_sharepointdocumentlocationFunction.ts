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
    const data = await response.json();
    return data as RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse;
  }
}
