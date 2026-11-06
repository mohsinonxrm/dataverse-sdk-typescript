import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UnlockInvoicePricing action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UnlockInvoicePricingResponse = void;

/**
 * Parameters of the UnlockInvoicePricing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnlockInvoicePricingActionParameters {
  InvoiceId: string;
}

/**
 * UnlockInvoicePricing action
 *
 * Unbound action
 */
export class UnlockInvoicePricingAction implements Executable<UnlockInvoicePricingResponse> {
  constructor(public readonly parameters: UnlockInvoicePricingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnlockInvoicePricing`;

    const body = requestBody({
      InvoiceId: this.parameters.InvoiceId,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<UnlockInvoicePricingResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
