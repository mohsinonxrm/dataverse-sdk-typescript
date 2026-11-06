import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { computeruseagent } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_computeruseagent_collectionResponse {
  value: computeruseagent[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.computeruseagent))
 */
export class RetrieveUnpublishedMultiple_computeruseagent_collectionFunction implements Executable<RetrieveUnpublishedMultiple_computeruseagent_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/computeruseagents/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_computeruseagent_collectionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveUnpublishedMultiple_computeruseagent_collectionResponse;
    return (await response.json()) as RetrieveUnpublishedMultiple_computeruseagent_collectionResponse;
  }
}
