import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';
import type { systemform, systemuser } from './types/index.js';

/**
 * Response from the RetrieveFilteredForms function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveFilteredFormsResponse = Array<systemform & { "@odata.etag"?: string; "@odata.type"?: string }>;

/**
 * Parameters of the RetrieveFilteredForms function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFilteredFormsFunctionParameters {
  EntityLogicalName: string;
  FormType: number;
  User: systemuser;
}

/**
 * RetrieveFilteredForms function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.systemform))
 */
export class RetrieveFilteredFormsFunction implements Executable<RetrieveFilteredFormsResponse> {
  constructor(
    public readonly parameters: RetrieveFilteredFormsFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/systemforms/Microsoft.Dynamics.CRM.RetrieveFilteredForms`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.EntityLogicalName, 'Edm.String'));
    }
    if (this.parameters.FormType !== undefined) {
      aliases.push(`FormType=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.FormType, 'Edm.Int32'));
    }
    if (this.parameters.User !== undefined) {
      aliases.push(`User=@p3`);
      params.append('@p3', JSON.stringify(this.parameters.User));
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

  async parseResponse(response: Response): Promise<RetrieveFilteredFormsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveFilteredFormsResponse }).value;
  }
}
