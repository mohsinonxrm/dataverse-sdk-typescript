import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * Response from AddToTeam action
 */
export interface AddToTeam_systemuserResponse {
  // No content returned
}

/**
 * AddToTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class AddToTeam_systemuserAction implements Executable<AddToTeam_systemuserResponse> {
  constructor(
    public readonly systemuserId: string,
  ) {}

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return (text ? JSON.parse(text) : {}) as AddToTeam_systemuserResponse;
  }
}
