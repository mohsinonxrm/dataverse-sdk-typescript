import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { mobileofflineprofileitem } from './types/index.js';

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_mobileofflineprofileitemResponse = (mobileofflineprofileitem & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.mobileofflineprofileitem)
 *
 * The first argument is the id of the mobileofflineprofileitem record to call it on.
 */
export class RetrieveUnpublished_mobileofflineprofileitemFunction implements Executable<RetrieveUnpublished_mobileofflineprofileitemResponse> {
  constructor(
    public readonly mobileofflineprofileitemId: string,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/mobileofflineprofileitems(${this.mobileofflineprofileitemId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_mobileofflineprofileitemResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as RetrieveUnpublished_mobileofflineprofileitemResponse;
  }
}
