import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the LockInvoicePricing action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type LockInvoicePricingResponse = void;

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
    const url = `${baseUrl}/invoices(${odataLiteral.guid(this.invoiceId)})/Microsoft.Dynamics.CRM.LockInvoicePricing`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<LockInvoicePricingResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
