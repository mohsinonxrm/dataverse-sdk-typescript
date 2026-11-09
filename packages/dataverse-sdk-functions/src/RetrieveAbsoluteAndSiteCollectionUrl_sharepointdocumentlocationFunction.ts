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
export interface RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse {
  "@odata.context"?: string;
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
    return (await response.json()) as RetrieveAbsoluteAndSiteCollectionUrl_sharepointdocumentlocationResponse;
  }
}
