import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { aipluginoperationresponsetemplate } from './types/index.js';

/**
 * Response from the RetrieveUnpublishedMultiple function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionResponse = Array<aipluginoperationresponsetemplate & { "@odata.etag"?: string; "@odata.type"?: string }>;

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
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveUnpublishedMultiple_aipluginoperationresponsetemplate_collectionResponse }).value;
  }
}
