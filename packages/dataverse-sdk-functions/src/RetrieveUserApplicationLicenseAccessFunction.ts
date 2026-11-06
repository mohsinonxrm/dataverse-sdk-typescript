import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from the RetrieveUserApplicationLicenseAccess function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserApplicationLicenseAccessResponse {
  "@odata.context"?: string;
  LicenseAccessInfo: string;
}

/**
 * Parameters of the RetrieveUserApplicationLicenseAccess function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserApplicationLicenseAccessFunctionParameters {
  ApplicationId: string;
}

/**
 * RetrieveUserApplicationLicenseAccess function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserApplicationLicenseAccessFunction implements Executable<RetrieveUserApplicationLicenseAccessResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrieveUserApplicationLicenseAccessFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserApplicationLicenseAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ApplicationId !== undefined) {
      aliases.push(`ApplicationId=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.ApplicationId, 'Edm.Guid'));
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

  async parseResponse(response: Response): Promise<RetrieveUserApplicationLicenseAccessResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveUserApplicationLicenseAccessResponse;
  }
}
