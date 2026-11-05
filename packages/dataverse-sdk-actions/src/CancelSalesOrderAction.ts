import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CancelSalesOrder action
 */
export interface CancelSalesOrderResponse {
  // No content returned
}

/**
 * CancelSalesOrder action
 *
 * Unbound action
 */
export class CancelSalesOrderAction implements Executable<CancelSalesOrderResponse> {
  constructor(
    public readonly orderClose: EntityReference,
    public readonly status: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CancelSalesOrder`;

    const body: Record<string, unknown> = {
      OrderClose: this.orderClose,
      Status: this.status,
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

  async parseResponse(response: Response): Promise<CancelSalesOrderResponse> {
    // No return value (204 No Content)
    return {};
  }
}
