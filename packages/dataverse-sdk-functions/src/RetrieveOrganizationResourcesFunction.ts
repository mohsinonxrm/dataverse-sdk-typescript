import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { OrganizationResources } from './types/index.js';

/**
 * Response from the RetrieveOrganizationResources function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveOrganizationResourcesResponse {
  "@odata.context"?: string;
  OrganizationResources: OrganizationResources;
}

/**
 * RetrieveOrganizationResources function
 *
 * Unbound function
 */
export class RetrieveOrganizationResourcesFunction implements Executable<RetrieveOrganizationResourcesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveOrganizationResources`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveOrganizationResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveOrganizationResourcesResponse;
  }
}
