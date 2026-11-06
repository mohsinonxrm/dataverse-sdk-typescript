import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';
import type { EntityFilters } from './types/index.js';

/**
 * Response from GetChanges function
 */
export interface GetChangesResponse {
  value: string;
}

/**
 * Parameters of the GetChanges function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetChangesFunctionParameters {
  Stamp: string;
  AppModuleId?: string;
  Filters?: EntityFilters | keyof typeof EntityFilters;
}

/**
 * GetChanges function
 *
 * Unbound function
 */
export class GetChangesFunction implements Executable<GetChangesResponse> {
  constructor(
    public readonly parameters: GetChangesFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetChanges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Stamp !== undefined) {
      aliases.push(`Stamp=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.Stamp, 'Edm.String'));
    }
    if (this.parameters.AppModuleId !== undefined) {
      aliases.push(`AppModuleId=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.AppModuleId, 'Edm.Guid'));
    }
    if (this.parameters.Filters !== undefined) {
      aliases.push(`Filters=@p3`);
      params.append('@p3', formatParameterAlias(this.parameters.Filters, 'mscrm.EntityFilters', 'EnumerationType'));
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

  async parseResponse(response: Response): Promise<GetChangesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return (text ? JSON.parse(text) : {}) as GetChangesResponse;
  }
}
