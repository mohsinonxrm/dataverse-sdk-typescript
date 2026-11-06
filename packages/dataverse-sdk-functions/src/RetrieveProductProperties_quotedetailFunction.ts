import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { dynamicproperty } from './types/index.js';

/**
 * Response from the RetrieveProductProperties function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveProductProperties_quotedetailResponse = Array<dynamicproperty & { "@odata.etag"?: string; "@odata.type"?: string }>;

/**
 * RetrieveProductProperties function
 *
 * Bound function
 * Binding parameter: entity (mscrm.quotedetail)
 *
 * The first argument is the id of the quotedetail record to call it on.
 */
export class RetrieveProductProperties_quotedetailFunction implements Executable<RetrieveProductProperties_quotedetailResponse> {
  constructor(
    public readonly quotedetailId: string,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/quotedetails(${this.quotedetailId})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProductProperties_quotedetailResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveProductProperties_quotedetailResponse }).value;
  }
}
