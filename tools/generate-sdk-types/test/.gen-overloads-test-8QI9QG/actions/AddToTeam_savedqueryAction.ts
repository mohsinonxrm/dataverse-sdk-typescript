import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * Response from AddToTeam action
 */
export interface AddToTeam_savedqueryResponse {
  // No content returned
}

/**
 * AddToTeam action
 *
 * Bound action
 * Binding parameter: entity (mscrm.savedquery)
 *
 * The first argument is the id of the savedquery record to call it on.
 */
export class AddToTeam_savedqueryAction implements Executable<AddToTeam_savedqueryResponse> {
  constructor(
    public readonly savedqueryId: string,
  ) {}

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return (text ? JSON.parse(text) : {}) as AddToTeam_savedqueryResponse;
  }
}
