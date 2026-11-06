import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';
import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { EntityReference } from './EntityReference.js';
import { requestBody } from './internal/requestBody.js';
import type { AnyEntityPayload } from './types/EntityPayload.js';

/**
 * Parameters of the ShareRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ShareRecord_teamRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ShareRecord request message
 *
 * Web API Action: ShareRecord
 *
 * The first argument is the id of the team record to call it on.
 */
export class ShareRecord_teamRequest extends OrganizationRequest implements Executable<ShareRecord_teamResponse> {
  declare readonly Parameters: Readonly<ShareRecord_teamRequestParameters>;

  constructor(
    public teamId: string,
    parameters: ShareRecord_teamRequestParameters,
  ) {
    super('ShareRecord', { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.ShareRecord`;

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

  async parseResponse(response: Response): Promise<ShareRecord_teamResponse> {
    // No return value (204 No Content)
    return new ShareRecord_teamResponse();
  }
}

/**
 * ShareRecord response message
 */
export class ShareRecord_teamResponse extends OrganizationResponse {
  constructor() {
    super('ShareRecord');
  }

  static fromResponse(_data: unknown): ShareRecord_teamResponse {
    return new ShareRecord_teamResponse();
  }
}
