import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { desktopflowbinary } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_desktopflowbinary_collectionResponse {
  value: desktopflowbinary[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.desktopflowbinary))
 */
export class RetrieveUnpublishedMultiple_desktopflowbinary_collectionFunction implements Executable<RetrieveUnpublishedMultiple_desktopflowbinary_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/desktopflowbinaries/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_desktopflowbinary_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as RetrieveUnpublishedMultiple_desktopflowbinary_collectionResponse;
  }
}
