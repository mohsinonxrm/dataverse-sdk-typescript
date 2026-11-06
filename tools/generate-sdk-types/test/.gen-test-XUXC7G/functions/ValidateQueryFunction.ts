import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from ValidateQuery function
 */
export interface ValidateQueryResponse {
  value: boolean;
}

/**
 * Parameters of the ValidateQuery function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateQueryFunctionParameters {
  FetchXml: string;
  Count: number;
}

/**
 * ValidateQuery function
 *
 * Unbound function
 */
export class ValidateQueryFunction implements Executable<ValidateQueryResponse> {
  constructor(
    public readonly parameters: ValidateQueryFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateQuery`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.FetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.FetchXml, 'Edm.String'));
    }
    if (this.parameters.Count !== undefined) {
      aliases.push(`Count=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.Count, 'Edm.Int32'));
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

  async parseResponse(response: Response): Promise<ValidateQueryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return (text ? JSON.parse(text) : {}) as ValidateQueryResponse;
  }
}
