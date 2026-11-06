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
 *
 * The first argument is the id of the resourcegroup record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveByGroupResourceResponse;
  }
}
