import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * Response from the RetrieveVersion function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveVersionResponse {
  "@odata.context"?: string;
  Version: string;
}

/**
 * RetrieveVersion function
 *
 * Unbound function
 */
export class RetrieveVersionFunction implements Executable<RetrieveVersionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveVersion`;

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveVersionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveVersionResponse;
  }
}
