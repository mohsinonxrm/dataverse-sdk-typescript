import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UnlockSalesOrderPricing action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UnlockSalesOrderPricingResponse = void;

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

  parseResponse(_response: Response): Promise<UnlockSalesOrderPricingResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
