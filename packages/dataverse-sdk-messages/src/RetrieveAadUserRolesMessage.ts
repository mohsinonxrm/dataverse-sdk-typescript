import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { role } from "./types/index.js";

/**
 * Parameters of the RetrieveAadUserRoles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAadUserRolesRequestParameters {
  DirectoryObjectId: string;
}

/**
 * RetrieveAadUserRoles request message
 *
 * Web API Function: RetrieveAadUserRoles
 */
export class RetrieveAadUserRolesRequest
  extends OrganizationRequest
  implements Executable<RetrieveAadUserRolesResponse>
{
  declare readonly Parameters: Readonly<RetrieveAadUserRolesRequestParameters>;

  constructor(parameters: RetrieveAadUserRolesRequestParameters) {
    super("RetrieveAadUserRoles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAadUserRoles`;

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

  async parseResponse(response: Response): Promise<RetrieveAadUserRolesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveAadUserRolesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveAadUserRolesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAadUserRoles function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveAadUserRolesResult = Array<
  role & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveAadUserRoles response message
 *
 * `result` is the value the RetrieveAadUserRoles function returns (see {@link RetrieveAadUserRolesResult}).
 */
export class RetrieveAadUserRolesResponse extends OrganizationResponse {
  constructor(public result: RetrieveAadUserRolesResult) {
    super("RetrieveAadUserRoles");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAadUserRolesResponse {
    return new RetrieveAadUserRolesResponse(
      data === undefined ? [] : (data as { value: RetrieveAadUserRolesResult }).value
    );
  }
}
