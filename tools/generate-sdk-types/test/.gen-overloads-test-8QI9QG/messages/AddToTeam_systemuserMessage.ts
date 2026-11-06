import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';
import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * AddToTeam request message
 *
 * Web API Action: AddToTeam
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class AddToTeam_systemuserRequest extends OrganizationRequest implements Executable<AddToTeam_systemuserResponse> {
  constructor(
    public systemuserId: string,
  ) {
    super('AddToTeam');
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.AddToTeam`;

    return {
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<AddToTeam_systemuserResponse> {
    // No return value (204 No Content)
    return new AddToTeam_systemuserResponse();
  }
}

/**
 * AddToTeam response message
 */
export class AddToTeam_systemuserResponse extends OrganizationResponse {
  constructor() {
    super('AddToTeam');
  }

  static fromResponse(_data: unknown): AddToTeam_systemuserResponse {
    return new AddToTeam_systemuserResponse();
  }
}
