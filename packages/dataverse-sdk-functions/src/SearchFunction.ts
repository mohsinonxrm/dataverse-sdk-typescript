import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { AppointmentRequest, SearchResults } from './types/index.js';

/**
 * Response from the Search function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SearchResponse {
  "@odata.context"?: string;
  SearchResults: SearchResults;
}

/**
 * Parameters of the Search function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchFunctionParameters {
  AppointmentRequest?: AppointmentRequest;
}

/**
 * Search function
 *
 * Unbound function
 */
export class SearchFunction implements Executable<SearchResponse> {
  constructor(
    public readonly parameters: SearchFunctionParameters = {},
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Search`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.AppointmentRequest !== undefined) {
      aliases.push(`AppointmentRequest=@p1`);
      params.append('@p1', JSON.stringify(this.parameters.AppointmentRequest));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(',')})?${params.toString()}`;
    }

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<SearchResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SearchResponse;
  }
}
