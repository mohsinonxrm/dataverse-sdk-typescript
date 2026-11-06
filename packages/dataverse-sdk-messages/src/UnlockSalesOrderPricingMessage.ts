import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UnlockSalesOrderPricing request message
 *
 * Web API Action: UnlockSalesOrderPricing
 */
export class UnlockSalesOrderPricingRequest
  extends OrganizationRequest
  implements Executable<UnlockSalesOrderPricingResponse>
{
  constructor(public salesOrderId: string) {
    super("UnlockSalesOrderPricing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnlockSalesOrderPricing`;

    const body: Record<string, unknown> = {
      SalesOrderId: this.salesOrderId,
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

  async parseResponse(response: Response): Promise<UnlockSalesOrderPricingResponse> {
    // No return value (204 No Content)
    return new UnlockSalesOrderPricingResponse();
  }
}

/**
 * UnlockSalesOrderPricing response message
 */
export class UnlockSalesOrderPricingResponse extends OrganizationResponse {
  constructor() {
    super("UnlockSalesOrderPricing");
  }

  static fromResponse(_data: unknown): UnlockSalesOrderPricingResponse {
    return new UnlockSalesOrderPricingResponse();
  }
}
