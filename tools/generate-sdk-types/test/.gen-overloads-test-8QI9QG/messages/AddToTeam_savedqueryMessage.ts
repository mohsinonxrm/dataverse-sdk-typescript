import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';
import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * AddToTeam request message
 *
 * Web API Action: AddToTeam
 *
 * The first argument is the id of the savedquery record to call it on.
 */
export class AddToTeam_savedqueryRequest extends OrganizationRequest implements Executable<AddToTeam_savedqueryResponse> {
  constructor(
    public savedqueryId: string,
  ) {
    super('AddToTeam');
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/savedqueries(${this.savedqueryId})/Microsoft.Dynamics.CRM.AddToTeam`;

    return {
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<AddToTeam_savedqueryResponse> {
    // No return value (204 No Content)
    return new AddToTeam_savedqueryResponse();
  }
}

/**
 * AddToTeam response message
 */
export class AddToTeam_savedqueryResponse extends OrganizationResponse {
  constructor() {
    super('AddToTeam');
  }

  static fromResponse(_data: unknown): AddToTeam_savedqueryResponse {
    return new AddToTeam_savedqueryResponse();
  }
}
