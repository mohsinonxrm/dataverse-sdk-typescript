import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from LockSalesOrderPricing action
 */
export interface LockSalesOrderPricingResponse {
  // No content returned
}

/**
 * LockSalesOrderPricing action
 *
 * Bound action
 * Binding parameter: entity (mscrm.salesorder)
 */
export class LockSalesOrderPricingAction implements Executable<LockSalesOrderPricingResponse> {
  constructor(public readonly salesorderId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesorders(${this.salesorderId})/Microsoft.Dynamics.CRM.LockSalesOrderPricing`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<LockSalesOrderPricingResponse> {
    // No return value (204 No Content)
    return {};
  }
}
