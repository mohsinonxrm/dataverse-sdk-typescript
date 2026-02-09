import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { systemuser } from "./types/index.js";

/**
 * Response from RetrieveAllChildUsersSystemUser function
 */
export interface RetrieveAllChildUsersSystemUserResponse {
  value: systemuser[];
}

/**
 * RetrieveAllChildUsersSystemUser function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveAllChildUsersSystemUserFunction implements Executable<RetrieveAllChildUsersSystemUserResponse> {
  constructor(public readonly systemuserId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveAllChildUsersSystemUser`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAllChildUsersSystemUserResponse> {
    const data = await response.json();
    return data as RetrieveAllChildUsersSystemUserResponse;
  }
}
