import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveAadUserPrivileges message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserPrivilegesRequestParameters {
  DirectoryObjectId: string;
}

/**
 * RetrieveAadUserPrivileges request message
 *
 * Web API Function: RetrieveAadUserPrivileges
 */
export class RetrieveAadUserPrivilegesRequest
  extends OrganizationRequest
  implements Executable<RetrieveAadUserPrivilegesResponse>
{
  declare readonly Parameters: Readonly<RetrieveAadUserPrivilegesRequestParameters>;

  constructor(parameters: RetrieveAadUserPrivilegesRequestParameters) {
    super("RetrieveAadUserPrivileges", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserPrivileges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.DirectoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.DirectoryObjectId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveAadUserPrivilegesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAadUserPrivilegesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAadUserPrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAadUserPrivilegesResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveAadUserPrivileges response message
 *
 * `result` is the value the RetrieveAadUserPrivileges function returns (see {@link RetrieveAadUserPrivilegesResult}).
 */
export class RetrieveAadUserPrivilegesResponse extends OrganizationResponse {
  constructor(public result: RetrieveAadUserPrivilegesResult) {
    super("RetrieveAadUserPrivileges");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAadUserPrivilegesResponse {
    return new RetrieveAadUserPrivilegesResponse(data as RetrieveAadUserPrivilegesResult);
  }
}
