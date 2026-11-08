import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveAadUserSetOfPrivilegesByIds message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserSetOfPrivilegesByIdsRequestParameters {
  DirectoryObjectId: string;
  PrivilegeIds: string[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByIds request message
 *
 * Web API Function: RetrieveAadUserSetOfPrivilegesByIds
 */
export class RetrieveAadUserSetOfPrivilegesByIdsRequest
  extends OrganizationRequest
  implements Executable<RetrieveAadUserSetOfPrivilegesByIdsResponse>
{
  declare readonly Parameters: Readonly<RetrieveAadUserSetOfPrivilegesByIdsRequestParameters>;

  constructor(parameters: RetrieveAadUserSetOfPrivilegesByIdsRequestParameters) {
    super("RetrieveAadUserSetOfPrivilegesByIds", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserSetOfPrivilegesByIds`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.DirectoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.DirectoryObjectId, "Edm.Guid"));
    }
    if (this.Parameters.PrivilegeIds !== undefined) {
      aliases.push(`PrivilegeIds=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.PrivilegeIds, "Collection(Edm.Guid)", "Collection")
      );
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

  async parseResponse(response: Response): Promise<RetrieveAadUserSetOfPrivilegesByIdsResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAadUserSetOfPrivilegesByIdsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAadUserSetOfPrivilegesByIds function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAadUserSetOfPrivilegesByIdsResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByIds response message
 *
 * `result` is the value the RetrieveAadUserSetOfPrivilegesByIds function returns (see {@link RetrieveAadUserSetOfPrivilegesByIdsResult}).
 */
export class RetrieveAadUserSetOfPrivilegesByIdsResponse extends OrganizationResponse {
  constructor(public result: RetrieveAadUserSetOfPrivilegesByIdsResult) {
    super("RetrieveAadUserSetOfPrivilegesByIds");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAadUserSetOfPrivilegesByIdsResponse {
    return new RetrieveAadUserSetOfPrivilegesByIdsResponse(
      data as RetrieveAadUserSetOfPrivilegesByIdsResult
    );
  }
}
