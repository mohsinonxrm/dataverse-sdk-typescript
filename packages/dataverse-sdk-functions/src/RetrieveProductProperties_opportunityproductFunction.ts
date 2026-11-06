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
    const data = await response.json();
    return data as RetrieveProductProperties_opportunityproductResponse;
  }
}
