import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { dynamicproperty } from "./types/index.js";

/**
 * Response from RetrieveProductProperties function
 */
export interface RetrieveProductProperties_quotedetailResponse {
  value: dynamicproperty[];
}

/**
 * RetrieveProductProperties function
 *
 * Bound function
 * Binding parameter: entity (mscrm.quotedetail)
 */
export class RetrieveProductProperties_quotedetailFunction implements Executable<RetrieveProductProperties_quotedetailResponse> {
  constructor(public readonly quotedetailId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/quotedetails(${this.quotedetailId})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProductProperties_quotedetailResponse> {
    const data = await response.json();
    return data as RetrieveProductProperties_quotedetailResponse;
  }
}
