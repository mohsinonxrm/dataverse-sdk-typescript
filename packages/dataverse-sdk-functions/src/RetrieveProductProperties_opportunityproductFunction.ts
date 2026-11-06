import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { dynamicproperty } from "./types/index.js";

/**
 * Response from RetrieveProductProperties function
 */
export interface RetrieveProductProperties_opportunityproductResponse {
  value: dynamicproperty[];
}

/**
 * RetrieveProductProperties function
 *
 * Bound function
 * Binding parameter: entity (mscrm.opportunityproduct)
 *
 * The first argument is the id of the opportunityproduct record to call it on.
 */
export class RetrieveProductProperties_opportunityproductFunction implements Executable<RetrieveProductProperties_opportunityproductResponse> {
  constructor(public readonly opportunityproductId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/opportunityproducts(${this.opportunityproductId})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveProductProperties_opportunityproductResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveProductProperties_opportunityproductResponse;
  }
}
