import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from the RetrieveProcessInstances function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveProcessInstancesResponse = Array<{ "@odata.etag"?: string; "@odata.type"?: string; [column: string]: unknown }>;

/**
 * Parameters of the RetrieveProcessInstances function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveProcessInstancesFunctionParameters {
  EntityId: string;
  EntityLogicalName: string;
}

/**
 * RetrieveProcessInstances function
 *
 * Unbound function
 */
export class RetrieveProcessInstancesFunction implements Executable<RetrieveProcessInstancesResponse> {
  constructor(
    public readonly parameters: RetrieveProcessInstancesFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProcessInstances`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityId !== undefined) {
      aliases.push(`EntityId=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.EntityId, 'Edm.Guid'));
    }
    if (this.parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.EntityLogicalName, 'Edm.String'));
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

  async parseResponse(response: Response): Promise<RetrieveProcessInstancesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveProcessInstancesResponse }).value;
  }
}
