import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { OrganizationInfo } from './types/index.js';

/**
 * Response from the RetrieveOrganizationInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveOrganizationInfoResponse {
  "@odata.context"?: string;
  organizationInfo: OrganizationInfo;
}

/**
 * RetrieveOrganizationInfo function
 *
 * Unbound function
 */
export class RetrieveOrganizationInfoFunction implements Executable<RetrieveOrganizationInfoResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveOrganizationInfo`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveOrganizationInfoResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveOrganizationInfoResponse;
  }
}
