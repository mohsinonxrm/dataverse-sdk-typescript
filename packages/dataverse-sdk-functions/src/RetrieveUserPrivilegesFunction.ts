import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { RolePrivilege } from "./types/index.js";

/**
 * Response from RetrieveUserPrivileges function
 */
export interface RetrieveUserPrivilegesResponse {
  RolePrivileges: RolePrivilege[];
}

/**
 * RetrieveUserPrivileges function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserPrivilegesFunction implements Executable<RetrieveUserPrivilegesResponse> {
  constructor(public readonly systemuserId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserPrivileges`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUserPrivilegesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUserPrivilegesResponse;
    return (await response.json()) as RetrieveUserPrivilegesResponse;
  }
}
