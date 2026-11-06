import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from the RetrieveInstalledLanguagePackVersion function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveInstalledLanguagePackVersionResponse {
  "@odata.context"?: string;
  Version: string;
}

/**
 * Parameters of the RetrieveInstalledLanguagePackVersion function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveInstalledLanguagePackVersionFunctionParameters {
  Language: number;
}

/**
 * RetrieveInstalledLanguagePackVersion function
 *
 * Unbound function
 */
export class RetrieveInstalledLanguagePackVersionFunction implements Executable<RetrieveInstalledLanguagePackVersionResponse> {
  constructor(
    public readonly parameters: RetrieveInstalledLanguagePackVersionFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveInstalledLanguagePackVersion`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Language !== undefined) {
      aliases.push(`Language=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.Language, 'Edm.Int32'));
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

  async parseResponse(response: Response): Promise<RetrieveInstalledLanguagePackVersionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveInstalledLanguagePackVersionResponse;
  }
}
