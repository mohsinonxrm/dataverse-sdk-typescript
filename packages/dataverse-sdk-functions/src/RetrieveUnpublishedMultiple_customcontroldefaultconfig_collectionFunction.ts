import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { customcontroldefaultconfig } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_customcontroldefaultconfig_collectionResponse {
  value: customcontroldefaultconfig[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.customcontroldefaultconfig))
 */
export class RetrieveUnpublishedMultiple_customcontroldefaultconfig_collectionFunction implements Executable<RetrieveUnpublishedMultiple_customcontroldefaultconfig_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/customcontroldefaultconfigs/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_customcontroldefaultconfig_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_customcontroldefaultconfig_collectionResponse;
  }
}
