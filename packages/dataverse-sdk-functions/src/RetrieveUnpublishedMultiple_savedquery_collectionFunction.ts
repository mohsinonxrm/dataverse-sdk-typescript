import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { savedquery } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_savedquery_collectionResponse {
  value: savedquery[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.savedquery))
 */
export class RetrieveUnpublishedMultiple_savedquery_collectionFunction implements Executable<RetrieveUnpublishedMultiple_savedquery_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/savedqueries/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_savedquery_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_savedquery_collectionResponse;
  }
}
