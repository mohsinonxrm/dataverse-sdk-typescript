import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { EntityReference } from './types/EntityReference.js';
import { requestBody } from './internal/requestBody.js';
import type { AnyEntityPayload } from './types/EntityPayload.js';

/**
 * Response from ShareRecord action
 */
export interface ShareRecord_teamResponse {
  // No content returned
}

/**
 * Parameters of the ShareRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ShareRecord_teamActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ShareRecord action
 *
 * Bound action
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class ShareRecord_teamAction implements Executable<ShareRecord_teamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly parameters: ShareRecord_teamActionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.ShareRecord`;

    const body = requestBody({
      Target: this.parameters.Target,
    });

    return {
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ShareRecord_teamResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return (text ? JSON.parse(text) : {}) as ShareRecord_teamResponse;
  }
}
