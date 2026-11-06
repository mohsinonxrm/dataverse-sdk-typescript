import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { savedqueryvisualization } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_savedqueryvisualization_collectionResponse {
  value: savedqueryvisualization[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.savedqueryvisualization))
 */
export class RetrieveUnpublishedMultiple_savedqueryvisualization_collectionFunction implements Executable<RetrieveUnpublishedMultiple_savedqueryvisualization_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/savedqueryvisualizations/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_savedqueryvisualization_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as RetrieveUnpublishedMultiple_savedqueryvisualization_collectionResponse;
  }
}
