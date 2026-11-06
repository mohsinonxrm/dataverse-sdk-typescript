import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UnlockSalesOrderPricing action
 */
export interface UnlockSalesOrderPricingResponse {
  // No content returned
}

/**
 * Parameters of the UnlockSalesOrderPricing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnlockSalesOrderPricingActionParameters {
  SalesOrderId: string;
}

/**
 * UnlockSalesOrderPricing action
 *
 * Unbound action
 */
export class UnlockSalesOrderPricingAction implements Executable<UnlockSalesOrderPricingResponse> {
  constructor(public readonly parameters: UnlockSalesOrderPricingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnlockSalesOrderPricing`;

    const body = requestBody({
      SalesOrderId: this.parameters.SalesOrderId,
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

  async parseResponse(response: Response): Promise<UnlockSalesOrderPricingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UnlockSalesOrderPricingResponse;
  }
}
