import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperationparameter } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse {
  value: aipluginoperationparameter[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.aipluginoperationparameter))
 */
export class RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionFunction implements Executable<RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aipluginoperationparameters/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse;
  }
}
