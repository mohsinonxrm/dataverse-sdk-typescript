import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { EntityReference } from './types/EntityReference.js';
import { requestBody } from './internal/requestBody.js';
import type { AnyEntityPayload } from './types/EntityPayload.js';

/**
 * Response from ShareRecord action
 */
export interface ShareRecordResponse {
  // No content returned
}

/**
 * Parameters of the ShareRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ShareRecordActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ShareRecord action
 *
 * Unbound action
 */
export class ShareRecordAction implements Executable<ShareRecordResponse> {
  constructor(
    public readonly parameters: ShareRecordActionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ShareRecord`;

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

  async parseResponse(response: Response): Promise<ShareRecordResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return (text ? JSON.parse(text) : {}) as ShareRecordResponse;
  }
}
