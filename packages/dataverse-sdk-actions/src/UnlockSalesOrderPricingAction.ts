import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UnlockSalesOrderPricing action
 */
export interface UnlockSalesOrderPricingResponse {
  // No content returned
}

/**
 * UnlockSalesOrderPricing action
 *
 * Unbound action
 */
export class UnlockSalesOrderPricingAction implements Executable<UnlockSalesOrderPricingResponse> {
  constructor(public readonly salesOrderId: string) {}

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
    return {};
  }
}
