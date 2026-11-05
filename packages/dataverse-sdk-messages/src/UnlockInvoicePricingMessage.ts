import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UnlockInvoicePricing request message
 *
 * Web API Action: UnlockInvoicePricing
 */
export class UnlockInvoicePricingRequest
  extends OrganizationRequest
  implements Executable<UnlockInvoicePricingResponse>
{
  constructor(public invoiceId: string) {
    super("UnlockInvoicePricing");
  }

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
    return new UnlockInvoicePricingResponse();
  }
}

/**
 * UnlockInvoicePricing response message
 */
export class UnlockInvoicePricingResponse extends OrganizationResponse {
  constructor() {
    super("UnlockInvoicePricing");
  }

  static fromResponse(_data: unknown): UnlockInvoicePricingResponse {
    return new UnlockInvoicePricingResponse();
  }
}
