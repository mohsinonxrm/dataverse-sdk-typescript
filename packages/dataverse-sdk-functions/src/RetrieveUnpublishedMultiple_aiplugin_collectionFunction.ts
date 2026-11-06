import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aiplugin } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_aiplugin_collectionResponse {
  value: aiplugin[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.aiplugin))
 */
export class RetrieveUnpublishedMultiple_aiplugin_collectionFunction implements Executable<RetrieveUnpublishedMultiple_aiplugin_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aiplugins/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_aiplugin_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as RetrieveUnpublishedMultiple_aiplugin_collectionResponse;
  }
}
