import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { appmodule } from './types/index.js';

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_appmoduleResponse = (appmodule & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.appmodule)
 *
 * The first argument is the id of the appmodule record to call it on.
 */
export class RetrieveUnpublished_appmoduleFunction implements Executable<RetrieveUnpublished_appmoduleResponse> {
  constructor(
    public readonly appmoduleId: string,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/appmodules(${this.appmoduleId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_appmoduleResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as RetrieveUnpublished_appmoduleResponse;
  }
}
