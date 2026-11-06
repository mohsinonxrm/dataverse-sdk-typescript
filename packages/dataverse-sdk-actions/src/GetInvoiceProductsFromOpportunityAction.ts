import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Response from GetInvoiceProductsFromOpportunity action
 */
export interface GetInvoiceProductsFromOpportunityResponse {
  // No content returned
}

/**
 * GetInvoiceProductsFromOpportunity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.invoice)
 */
export class GetInvoiceProductsFromOpportunityAction implements Executable<GetInvoiceProductsFromOpportunityResponse> {
  constructor(
    public readonly invoiceId: string,
    public readonly opportunity: EntityReference | EntityPayload<opportunity>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/invoices(${this.invoiceId})/Microsoft.Dynamics.CRM.GetInvoiceProductsFromOpportunity`;

    const body: Record<string, unknown> = {
      Opportunity: this.opportunity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetInvoiceProductsFromOpportunityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
