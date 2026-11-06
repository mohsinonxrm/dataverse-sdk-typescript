import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';
import type { dependency } from './types/index.js';

/**
 * Response from the RetrieveDependentComponents function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveDependentComponentsResponse = Array<dependency & { "@odata.etag"?: string; "@odata.type"?: string }>;

/**
 * Parameters of the RetrieveDependentComponents function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDependentComponentsFunctionParameters {
  ObjectId: string;
  ComponentType: number;
}

/**
 * RetrieveDependentComponents function
 *
 * Unbound function
 */
export class RetrieveDependentComponentsFunction implements Executable<RetrieveDependentComponentsResponse> {
  constructor(
    public readonly parameters: RetrieveDependentComponentsFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDependentComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.ObjectId, 'Edm.Guid'));
    }
    if (this.parameters.ComponentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.ComponentType, 'Edm.Int32'));
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

  async parseResponse(response: Response): Promise<RetrieveDependentComponentsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveDependentComponentsResponse }).value;
  }
}
