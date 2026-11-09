import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UnlockInvoicePricing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnlockInvoicePricingRequestParameters {
  InvoiceId: string;
}

/**
 * UnlockInvoicePricing request message
 *
 * Web API Action: UnlockInvoicePricing
 */
export class UnlockInvoicePricingRequest
  extends OrganizationRequest
  implements Executable<UnlockInvoicePricingResponse>
{
  declare readonly Parameters: Readonly<UnlockInvoicePricingRequestParameters>;

  constructor(parameters: UnlockInvoicePricingRequestParameters) {
    super("UnlockInvoicePricing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnlockInvoicePricing`;

    const body = requestBody({
      InvoiceId: this.Parameters.InvoiceId,
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
    // No return value (204 No Content)
    return Promise.resolve(new UnlockInvoicePricingResponse());
  }
}

/**
 * UnlockInvoicePricing response message
 */
export class UnlockInvoicePricingResponse extends OrganizationResponse {
  constructor() {
    super("UnlockInvoicePricing");
  }

  static fromResponse(_data?: unknown): UnlockInvoicePricingResponse {
    return new UnlockInvoicePricingResponse();
  }
}
