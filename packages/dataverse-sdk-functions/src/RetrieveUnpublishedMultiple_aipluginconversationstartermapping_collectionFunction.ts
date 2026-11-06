import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginconversationstartermapping } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_aipluginconversationstartermapping_collectionResponse {
  value: aipluginconversationstartermapping[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.aipluginconversationstartermapping))
 */
export class RetrieveUnpublishedMultiple_aipluginconversationstartermapping_collectionFunction implements Executable<RetrieveUnpublishedMultiple_aipluginconversationstartermapping_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aipluginconversationstartermappings/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_aipluginconversationstartermapping_collectionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveUnpublishedMultiple_aipluginconversationstartermapping_collectionResponse;
    return (await response.json()) as RetrieveUnpublishedMultiple_aipluginconversationstartermapping_collectionResponse;
  }
}
