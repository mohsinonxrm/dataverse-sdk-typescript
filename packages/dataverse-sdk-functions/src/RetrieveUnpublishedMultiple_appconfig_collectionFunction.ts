import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appconfig } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_appconfig_collectionResponse {
  value: appconfig[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.appconfig))
 */
export class RetrieveUnpublishedMultiple_appconfig_collectionFunction implements Executable<RetrieveUnpublishedMultiple_appconfig_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/appconfigs/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_appconfig_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_appconfig_collectionResponse;
  }
}
