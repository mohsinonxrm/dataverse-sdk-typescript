import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * Response from the WhoAmI function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface WhoAmIResponse {
  "@odata.context"?: string;
  BusinessUnitId: string;
  OrganizationId: string;
  UserId: string;
}

/**
 * WhoAmI function
 *
 * Unbound function
 */
export class WhoAmIFunction implements Executable<WhoAmIResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/WhoAmI`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<WhoAmIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as WhoAmIResponse;
  }
}
