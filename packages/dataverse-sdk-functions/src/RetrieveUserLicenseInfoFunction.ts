import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { UserLicenseInfo } from './types/index.js';

/**
 * Response from the RetrieveUserLicenseInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserLicenseInfoResponse {
  "@odata.context"?: string;
  licenseInfo: UserLicenseInfo;
}

/**
 * RetrieveUserLicenseInfo function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserLicenseInfoFunction implements Executable<RetrieveUserLicenseInfoResponse> {
  constructor(
    public readonly systemuserId: string,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserLicenseInfo`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUserLicenseInfoResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveUserLicenseInfoResponse;
  }
}
