import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the LockSalesOrderPricing action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type LockSalesOrderPricingResponse = void;

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
    const url = `${baseUrl}/salesorders(${odataLiteral.guid(this.salesorderId)})/Microsoft.Dynamics.CRM.LockSalesOrderPricing`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<LockSalesOrderPricingResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
