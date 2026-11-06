import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appconfiginstance } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_appconfiginstance_collectionResponse {
  value: appconfiginstance[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.appconfiginstance))
 */
export class RetrieveUnpublishedMultiple_appconfiginstance_collectionFunction implements Executable<RetrieveUnpublishedMultiple_appconfiginstance_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/appconfiginstances/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_appconfiginstance_collectionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveUnpublishedMultiple_appconfiginstance_collectionResponse;
    return (await response.json()) as RetrieveUnpublishedMultiple_appconfiginstance_collectionResponse;
  }
}
