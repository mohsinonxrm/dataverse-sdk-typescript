import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { orderclose } from "./types/index.js";

/**
 * Response from FulfillSalesOrder action
 */
export interface FulfillSalesOrderResponse {
  // No content returned
}

/**
 * FulfillSalesOrder action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.salesorder))
 */
export class FulfillSalesOrderAction implements Executable<FulfillSalesOrderResponse> {
  constructor(
    public readonly orderClose: orderclose,
    public readonly status: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FulfillSalesOrder`;

    const body: Record<string, unknown> = {
      OrderClose: this.orderClose,
      Status: this.status,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<FulfillSalesOrderResponse> {
    // No return value (204 No Content)
    return {};
  }
}
