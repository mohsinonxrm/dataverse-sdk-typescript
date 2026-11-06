import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperationresponsetemplate } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionResponse {
  value: aipluginoperationresponsetemplate[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.aipluginoperationresponsetemplate))
 */
export class RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionFunction implements Executable<RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aipluginoperationresponsetemplates/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionResponse;
  }
}
