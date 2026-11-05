import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UnlockInvoicePricing action
 */
export interface UnlockInvoicePricingResponse {
  // No content returned
}

/**
 * UnlockInvoicePricing action
 *
 * Unbound action
 */
export class UnlockInvoicePricingAction implements Executable<UnlockInvoicePricingResponse> {
  constructor(public readonly invoiceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnlockInvoicePricing`;

    const body: Record<string, unknown> = {
      InvoiceId: this.invoiceId,
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

  async parseResponse(response: Response): Promise<UnlockInvoicePricingResponse> {
    // No return value (204 No Content)
    return {};
  }
}
