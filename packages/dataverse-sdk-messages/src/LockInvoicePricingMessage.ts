import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * LockInvoicePricing request message
 *
 * Web API Action: LockInvoicePricing
 */
export class LockInvoicePricingRequest
  extends OrganizationRequest
  implements Executable<LockInvoicePricingResponse>
{
  constructor(public invoiceId: string) {
    super("LockInvoicePricing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/invoices(${this.invoiceId})/Microsoft.Dynamics.CRM.LockInvoicePricing`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<LockInvoicePricingResponse> {
    // No return value (204 No Content)
    return new LockInvoicePricingResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.invoiceId,
    };
  }
}

/**
 * LockInvoicePricing response message
 */
export class LockInvoicePricingResponse extends OrganizationResponse {
  constructor() {
    super("LockInvoicePricing");
  }

  static fromResponse(_data: unknown): LockInvoicePricingResponse {
    return new LockInvoicePricingResponse();
  }
}
