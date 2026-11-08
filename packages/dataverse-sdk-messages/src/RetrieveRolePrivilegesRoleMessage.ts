import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveRolePrivilegesRole message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveRolePrivilegesRoleRequestParameters {
  RoleId: string;
}

/**
 * RetrieveRolePrivilegesRole request message
 *
 * Web API Function: RetrieveRolePrivilegesRole
 */
export class RetrieveRolePrivilegesRoleRequest
  extends OrganizationRequest
  implements Executable<RetrieveRolePrivilegesRoleResponse>
{
  declare readonly Parameters: Readonly<RetrieveRolePrivilegesRoleRequestParameters>;

  constructor(parameters: RetrieveRolePrivilegesRoleRequestParameters) {
    super("RetrieveRolePrivilegesRole", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRolePrivilegesRole`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.RoleId !== undefined) {
      aliases.push(`RoleId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.RoleId, "Edm.Guid"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveRolePrivilegesRoleResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveRolePrivilegesRoleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveRolePrivilegesRole function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveRolePrivilegesRoleResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveRolePrivilegesRole response message
 *
 * `result` is the value the RetrieveRolePrivilegesRole function returns (see {@link RetrieveRolePrivilegesRoleResult}).
 */
export class RetrieveRolePrivilegesRoleResponse extends OrganizationResponse {
  constructor(public result: RetrieveRolePrivilegesRoleResult) {
    super("RetrieveRolePrivilegesRole");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveRolePrivilegesRoleResponse {
    return new RetrieveRolePrivilegesRoleResponse(data as RetrieveRolePrivilegesRoleResult);
  }
}
