import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofile } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_mobileofflineprofile_collectionResponse {
  value: mobileofflineprofile[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.mobileofflineprofile))
 */
export class RetrieveUnpublishedMultiple_mobileofflineprofile_collectionFunction implements Executable<RetrieveUnpublishedMultiple_mobileofflineprofile_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/mobileofflineprofiles/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_mobileofflineprofile_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_mobileofflineprofile_collectionResponse;
  }
}
