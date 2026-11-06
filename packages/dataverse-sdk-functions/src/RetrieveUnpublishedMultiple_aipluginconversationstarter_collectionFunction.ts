import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginconversationstarter } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_aipluginconversationstarter_collectionResponse {
  value: aipluginconversationstarter[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.aipluginconversationstarter))
 */
export class RetrieveUnpublishedMultiple_aipluginconversationstarter_collectionFunction implements Executable<RetrieveUnpublishedMultiple_aipluginconversationstarter_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aipluginconversationstarters/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_aipluginconversationstarter_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_aipluginconversationstarter_collectionResponse;
  }
}
