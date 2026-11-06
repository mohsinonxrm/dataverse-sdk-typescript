import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UnlockInvoicePricing action
 */
export interface UnlockInvoicePricingResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<UnlockInvoicePricingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UnlockInvoicePricingResponse;
    return (await response.json()) as UnlockInvoicePricingResponse;
  }
}
