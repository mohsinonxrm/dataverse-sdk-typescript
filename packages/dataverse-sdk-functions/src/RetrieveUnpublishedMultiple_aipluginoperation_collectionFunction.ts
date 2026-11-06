import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperation } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_aipluginoperation_collectionResponse {
  value: aipluginoperation[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.aipluginoperation))
 */
export class RetrieveUnpublishedMultiple_aipluginoperation_collectionFunction implements Executable<RetrieveUnpublishedMultiple_aipluginoperation_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aipluginoperations/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_aipluginoperation_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_aipluginoperation_collectionResponse;
  }
}
