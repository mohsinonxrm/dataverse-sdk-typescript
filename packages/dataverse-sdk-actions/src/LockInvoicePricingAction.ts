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
 *
 * The first argument is the id of the invoice record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as LockInvoicePricingResponse;
    return (await response.json()) as LockInvoicePricingResponse;
  }
}
