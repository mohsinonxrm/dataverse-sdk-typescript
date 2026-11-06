import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';
import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { EntityReference } from './EntityReference.js';
import { requestBody } from './internal/requestBody.js';
import type { AnyEntityPayload } from './types/EntityPayload.js';

/**
 * Parameters of the ShareRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ShareRecordRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ShareRecord request message
 *
 * Web API Action: ShareRecord
 */
export class ShareRecordRequest extends OrganizationRequest implements Executable<ShareRecordResponse> {
  declare readonly Parameters: Readonly<ShareRecordRequestParameters>;

  constructor(
    parameters: ShareRecordRequestParameters,
  ) {
    super('ShareRecord', { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ShareRecord`;

    const body = requestBody({
      Target: this.Parameters.Target,
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
    // No return value (204 No Content)
    return new ShareRecordResponse();
  }
}

/**
 * ShareRecord response message
 */
export class ShareRecordResponse extends OrganizationResponse {
  constructor() {
    super('ShareRecord');
  }

  static fromResponse(_data: unknown): ShareRecordResponse {
    return new ShareRecordResponse();
  }
}
