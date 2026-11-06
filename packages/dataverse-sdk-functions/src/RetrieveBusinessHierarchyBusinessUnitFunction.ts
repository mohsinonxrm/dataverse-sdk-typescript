import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { businessunit } from "./types/index.js";

/**
 * Response from RetrieveBusinessHierarchyBusinessUnit function
 */
export interface RetrieveBusinessHierarchyBusinessUnitResponse {
  value: businessunit[];
}

/**
 * RetrieveBusinessHierarchyBusinessUnit function
 *
 * Bound function
 * Binding parameter: entity (mscrm.businessunit)
 *
 * The first argument is the id of the businessunit record to call it on.
 */
export class RetrieveBusinessHierarchyBusinessUnitFunction implements Executable<RetrieveBusinessHierarchyBusinessUnitResponse> {
  constructor(public readonly businessunitId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/businessunits(${this.businessunitId})/Microsoft.Dynamics.CRM.RetrieveBusinessHierarchyBusinessUnit`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveBusinessHierarchyBusinessUnitResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveBusinessHierarchyBusinessUnitResponse;
    return (await response.json()) as RetrieveBusinessHierarchyBusinessUnitResponse;
  }
}
