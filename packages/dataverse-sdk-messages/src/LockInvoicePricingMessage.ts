import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * LockInvoicePricing request message
 *
 * Web API Action: LockInvoicePricing
 *
 * The first argument is the id of the invoice record to call it on.
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
    // No return value (204 No Content)
    return Promise.resolve(new LockInvoicePricingResponse());
  }
}

/**
 * LockInvoicePricing response message
 */
export class LockInvoicePricingResponse extends OrganizationResponse {
  constructor() {
    super("LockInvoicePricing");
  }

  static fromResponse(_data?: unknown): LockInvoicePricingResponse {
    return new LockInvoicePricingResponse();
  }
}
