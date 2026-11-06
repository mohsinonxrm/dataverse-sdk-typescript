import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { dynamicproperty } from "./types/index.js";

/**
 * Response from RetrieveProductProperties function
 */
export interface RetrieveProductProperties_invoicedetailResponse {
  value: dynamicproperty[];
}

/**
 * RetrieveProductProperties function
 *
 * Bound function
 * Binding parameter: entity (mscrm.invoicedetail)
 */
export class RetrieveProductProperties_invoicedetailFunction implements Executable<RetrieveProductProperties_invoicedetailResponse> {
  constructor(public readonly invoicedetailId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/invoicedetails(${this.invoicedetailId})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

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
  ): Promise<RetrieveProductProperties_invoicedetailResponse> {
    const data = await response.json();
    return data as RetrieveProductProperties_invoicedetailResponse;
  }
}
