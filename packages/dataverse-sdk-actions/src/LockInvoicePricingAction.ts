import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from LockInvoicePricing action
 */
export interface LockInvoicePricingResponse {
  // No content returned
}

/**
 * LockInvoicePricing action
 *
 * Bound action
 * Binding parameter: entity (mscrm.invoice)
 */
export class LockInvoicePricingAction implements Executable<LockInvoicePricingResponse> {
  constructor(public readonly invoiceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/invoices(${this.invoiceId})/Microsoft.Dynamics.CRM.LockInvoicePricing`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<LockInvoicePricingResponse> {
    // No return value (204 No Content)
    return {};
  }
}
