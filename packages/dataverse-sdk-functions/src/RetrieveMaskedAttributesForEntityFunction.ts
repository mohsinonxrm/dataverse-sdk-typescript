import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from the RetrieveMaskedAttributesForEntity function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveMaskedAttributesForEntityResponse {
  "@odata.context"?: string;
  AttributeLogicalNames: string[];
}

/**
 * Parameters of the RetrieveMaskedAttributesForEntity function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMaskedAttributesForEntityFunctionParameters {
  EntityLogicalName: string;
}

/**
 * RetrieveMaskedAttributesForEntity function
 *
 * Unbound function
 */
export class RetrieveMaskedAttributesForEntityFunction implements Executable<RetrieveMaskedAttributesForEntityResponse> {
  constructor(
    public readonly parameters: RetrieveMaskedAttributesForEntityFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMaskedAttributesForEntity`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.EntityLogicalName, 'Edm.String'));
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

  async parseResponse(response: Response): Promise<RetrieveMaskedAttributesForEntityResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveMaskedAttributesForEntityResponse;
  }
}
