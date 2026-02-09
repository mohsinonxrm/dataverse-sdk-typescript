import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resource } from "./types/index.js";

/**
 * Response from RetrieveByGroupResource function
 */
export interface RetrieveByGroupResourceResponse {
  value: resource[];
}

/**
 * RetrieveByGroupResource function
 *
 * Bound function
 * Binding parameter: entity (mscrm.resourcegroup)
 */
export class RetrieveByGroupResourceFunction implements Executable<RetrieveByGroupResourceResponse> {
  constructor(public readonly resourcegroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${this.resourcegroupId})/Microsoft.Dynamics.CRM.RetrieveByGroupResource`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByGroupResourceResponse> {
    const data = await response.json();
    return data as RetrieveByGroupResourceResponse;
  }
}
