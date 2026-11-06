import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofileitem } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_mobileofflineprofileitem_collectionResponse {
  value: mobileofflineprofileitem[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.mobileofflineprofileitem))
 */
export class RetrieveUnpublishedMultiple_mobileofflineprofileitem_collectionFunction implements Executable<RetrieveUnpublishedMultiple_mobileofflineprofileitem_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/mobileofflineprofileitems/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_mobileofflineprofileitem_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_mobileofflineprofileitem_collectionResponse;
  }
}
