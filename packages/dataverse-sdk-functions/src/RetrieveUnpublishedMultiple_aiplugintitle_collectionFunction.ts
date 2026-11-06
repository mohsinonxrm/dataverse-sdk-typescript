import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aiplugintitle } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_aiplugintitle_collectionResponse {
  value: aiplugintitle[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.aiplugintitle))
 */
export class RetrieveUnpublishedMultiple_aiplugintitle_collectionFunction implements Executable<RetrieveUnpublishedMultiple_aiplugintitle_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aiplugintitles/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_aiplugintitle_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as RetrieveUnpublishedMultiple_aiplugintitle_collectionResponse;
  }
}
