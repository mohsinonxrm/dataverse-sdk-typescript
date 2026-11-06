import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * Response from the searchstatus function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchstatusResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * searchstatus function
 *
 * Unbound function
 */
export class searchstatusFunction implements Executable<searchstatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/searchstatus`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<searchstatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as searchstatusResponse;
  }
}
