import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RolePrivilege } from "./types/index.js";

/**
 * Parameters of the RetrieveAadUserSetOfPrivilegesByNames message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserSetOfPrivilegesByNamesRequestParameters {
  DirectoryObjectId: string;
  PrivilegeNames: string[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByNames request message
 *
 * Web API Function: RetrieveAadUserSetOfPrivilegesByNames
 */
export class RetrieveAadUserSetOfPrivilegesByNamesRequest
  extends OrganizationRequest
  implements Executable<RetrieveAadUserSetOfPrivilegesByNamesResponse>
{
  declare readonly Parameters: Readonly<RetrieveAadUserSetOfPrivilegesByNamesRequestParameters>;

  constructor(parameters: RetrieveAadUserSetOfPrivilegesByNamesRequestParameters) {
    super("RetrieveAadUserSetOfPrivilegesByNames", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserSetOfPrivilegesByNames`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.DirectoryObjectId !== undefined) {
      aliases.push(`DirectoryObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.DirectoryObjectId, "Edm.Guid"));
    }
    if (this.Parameters.PrivilegeNames !== undefined) {
      aliases.push(`PrivilegeNames=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.PrivilegeNames, "Collection(Edm.String)", "Collection")
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

  async parseResponse(response: Response): Promise<RetrieveAadUserSetOfPrivilegesByNamesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAadUserSetOfPrivilegesByNamesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAadUserSetOfPrivilegesByNames function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAadUserSetOfPrivilegesByNamesResult {
  "@odata.context"?: string;
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveAadUserSetOfPrivilegesByNames response message
 *
 * `result` is the value the RetrieveAadUserSetOfPrivilegesByNames function returns (see {@link RetrieveAadUserSetOfPrivilegesByNamesResult}).
 */
export class RetrieveAadUserSetOfPrivilegesByNamesResponse extends OrganizationResponse {
  constructor(public result: RetrieveAadUserSetOfPrivilegesByNamesResult) {
    super("RetrieveAadUserSetOfPrivilegesByNames");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAadUserSetOfPrivilegesByNamesResponse {
    return new RetrieveAadUserSetOfPrivilegesByNamesResponse(
      data as RetrieveAadUserSetOfPrivilegesByNamesResult
    );
  }
}
