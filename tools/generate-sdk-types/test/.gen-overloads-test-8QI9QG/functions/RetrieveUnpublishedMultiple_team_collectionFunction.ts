import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { team } from './types/index.js';

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_team_collectionResponse {
  value: team[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.team))
 */
export class RetrieveUnpublishedMultiple_team_collectionFunction implements Executable<RetrieveUnpublishedMultiple_team_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/teams/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublishedMultiple_team_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUnpublishedMultiple_team_collectionResponse;
  }
}
