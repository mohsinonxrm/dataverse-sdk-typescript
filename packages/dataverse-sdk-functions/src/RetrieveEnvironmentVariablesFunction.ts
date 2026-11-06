import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';

/**
 * Response from the RetrieveEnvironmentVariables function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveEnvironmentVariablesResponse = Array<{ "@odata.etag"?: string; "@odata.type"?: string; [column: string]: unknown }>;

/**
 * Parameters of the RetrieveEnvironmentVariables function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEnvironmentVariablesFunctionParameters {
  SchemaNames?: string[];
}

/**
 * RetrieveEnvironmentVariables function
 *
 * Unbound function
 */
export class RetrieveEnvironmentVariablesFunction implements Executable<RetrieveEnvironmentVariablesResponse> {
  constructor(
    public readonly parameters: RetrieveEnvironmentVariablesFunctionParameters = {},
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEnvironmentVariables`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.SchemaNames !== undefined) {
      aliases.push(`SchemaNames=@p1`);
      params.append('@p1', JSON.stringify(this.parameters.SchemaNames));
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

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariablesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveEnvironmentVariablesResponse }).value;
  }
}
