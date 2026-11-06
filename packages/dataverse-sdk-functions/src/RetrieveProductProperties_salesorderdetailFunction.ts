import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { dynamicproperty } from "./types/index.js";

/**
 * Response from RetrieveProductProperties function
 */
export interface RetrieveProductProperties_salesorderdetailResponse {
  value: dynamicproperty[];
}

/**
 * RetrieveProductProperties function
 *
 * Bound function
 * Binding parameter: entity (mscrm.salesorderdetail)
 */
export class RetrieveProductProperties_salesorderdetailFunction implements Executable<RetrieveProductProperties_salesorderdetailResponse> {
  constructor(public readonly salesorderdetailId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/salesorderdetails(${this.salesorderdetailId})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

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
  ): Promise<RetrieveProductProperties_salesorderdetailResponse> {
    const data = await response.json();
    return data as RetrieveProductProperties_salesorderdetailResponse;
  }
}
