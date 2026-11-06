import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';
import type { RolePrivilege } from './types/index.js';

/**
 * Response from the RetrieveRolePrivilegesRole function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveRolePrivilegesRoleResponse {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * Parameters of the RetrieveRolePrivilegesRole function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveRolePrivilegesRoleFunctionParameters {
  RoleId: string;
}

/**
 * RetrieveRolePrivilegesRole function
 *
 * Unbound function
 */
export class RetrieveRolePrivilegesRoleFunction implements Executable<RetrieveRolePrivilegesRoleResponse> {
  constructor(
    public readonly parameters: RetrieveRolePrivilegesRoleFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRolePrivilegesRole`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.RoleId !== undefined) {
      aliases.push(`RoleId=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.RoleId, 'Edm.Guid'));
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

  async parseResponse(response: Response): Promise<RetrieveRolePrivilegesRoleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveRolePrivilegesRoleResponse;
  }
}
