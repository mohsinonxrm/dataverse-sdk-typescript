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
 *
 * The first argument is the id of the salesorder record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<LockSalesOrderPricingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as LockSalesOrderPricingResponse;
  }
}
