import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { navigationsetting } from './types/index.js';

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_navigationsettingResponse = (navigationsetting & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.navigationsetting)
 *
 * The first argument is the id of the navigationsetting record to call it on.
 */
export class RetrieveUnpublished_navigationsettingFunction implements Executable<RetrieveUnpublished_navigationsettingResponse> {
  constructor(
    public readonly navigationsettingId: string,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/navigationsettings(${this.navigationsettingId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_navigationsettingResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as RetrieveUnpublished_navigationsettingResponse;
  }
}
