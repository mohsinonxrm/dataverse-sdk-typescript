import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * Response from the searchstatistics function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchstatisticsResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * searchstatistics function
 *
 * Unbound function
 */
export class searchstatisticsFunction implements Executable<searchstatisticsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/searchstatistics`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<searchstatisticsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as searchstatisticsResponse;
  }
}
