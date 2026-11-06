import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { systemform } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_systemform_collectionResponse {
  value: systemform[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.systemform))
 */
export class RetrieveUnpublishedMultiple_systemform_collectionFunction implements Executable<RetrieveUnpublishedMultiple_systemform_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/systemforms/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_systemform_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_systemform_collectionResponse;
  }
}
