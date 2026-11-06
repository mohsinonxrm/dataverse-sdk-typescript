import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appmodule } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_appmodule_collectionResponse {
  value: appmodule[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.appmodule))
 */
export class RetrieveUnpublishedMultiple_appmodule_collectionFunction implements Executable<RetrieveUnpublishedMultiple_appmodule_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/appmodules/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_appmodule_collectionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveUnpublishedMultiple_appmodule_collectionResponse;
    return (await response.json()) as RetrieveUnpublishedMultiple_appmodule_collectionResponse;
  }
}
