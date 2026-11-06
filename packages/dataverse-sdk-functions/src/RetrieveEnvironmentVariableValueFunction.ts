import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from the RetrieveEnvironmentVariableValue function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveEnvironmentVariableValueResponse {
  "@odata.context"?: string;
  Value: string;
}

/**
 * Parameters of the RetrieveEnvironmentVariableValue function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEnvironmentVariableValueFunctionParameters {
  DefinitionSchemaName: string;
}

/**
 * RetrieveEnvironmentVariableValue function
 *
 * Unbound function
 */
export class RetrieveEnvironmentVariableValueFunction implements Executable<RetrieveEnvironmentVariableValueResponse> {
  constructor(
    public readonly parameters: RetrieveEnvironmentVariableValueFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEnvironmentVariableValue`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.DefinitionSchemaName !== undefined) {
      aliases.push(`DefinitionSchemaName=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.DefinitionSchemaName, 'Edm.String'));
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

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariableValueResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveEnvironmentVariableValueResponse;
  }
}
