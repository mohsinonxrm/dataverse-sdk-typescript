import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';
import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { Label } from './types/index.js';

/**
 * Response from the RetrieveLocLabels function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveLocLabelsResponse {
  "@odata.context"?: string;
  Label: Label;
}

/**
 * Parameters of the RetrieveLocLabels function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveLocLabelsFunctionParameters {
  EntityMoniker: EntityReference;
  AttributeName: string;
  IncludeUnpublished: boolean;
}

/**
 * RetrieveLocLabels function
 *
 * Unbound function
 */
export class RetrieveLocLabelsFunction implements Executable<RetrieveLocLabelsResponse> {
  constructor(
    public readonly parameters: RetrieveLocLabelsFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveLocLabels`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityMoniker !== undefined) {
      aliases.push(`EntityMoniker=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.EntityMoniker, 'mscrm.crmbaseentity', 'EntityType'));
    }
    if (this.parameters.AttributeName !== undefined) {
      aliases.push(`AttributeName=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.AttributeName, 'Edm.String'));
    }
    if (this.parameters.IncludeUnpublished !== undefined) {
      aliases.push(`IncludeUnpublished=@p3`);
      params.append('@p3', formatParameterAlias(this.parameters.IncludeUnpublished, 'Edm.Boolean'));
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

  async parseResponse(response: Response): Promise<RetrieveLocLabelsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveLocLabelsResponse;
  }
}
