import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { navigationsetting } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_navigationsetting_collectionResponse {
  value: navigationsetting[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.navigationsetting))
 */
export class RetrieveUnpublishedMultiple_navigationsetting_collectionFunction implements Executable<RetrieveUnpublishedMultiple_navigationsetting_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/navigationsettings/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_navigationsetting_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as RetrieveUnpublishedMultiple_navigationsetting_collectionResponse;
  }
}
