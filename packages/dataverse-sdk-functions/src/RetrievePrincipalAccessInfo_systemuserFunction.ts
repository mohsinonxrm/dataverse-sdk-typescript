import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from the RetrievePrincipalAccessInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalAccessInfo_systemuserResponse {
  "@odata.context"?: string;
  AccessInfo: string;
}

/**
 * Parameters of the RetrievePrincipalAccessInfo function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrievePrincipalAccessInfo_systemuserFunctionParameters {
  ObjectId: string;
  EntityName: string;
}

/**
 * RetrievePrincipalAccessInfo function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrievePrincipalAccessInfo_systemuserFunction implements Executable<RetrievePrincipalAccessInfo_systemuserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrievePrincipalAccessInfo_systemuserFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccessInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.ObjectId, 'Edm.Guid'));
    }
    if (this.parameters.EntityName !== undefined) {
      aliases.push(`EntityName=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.EntityName, 'Edm.String'));
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

  async parseResponse(response: Response): Promise<RetrievePrincipalAccessInfo_systemuserResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrievePrincipalAccessInfo_systemuserResponse;
  }
}
