import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { orderclose } from "./types/index.js";

/**
 * FulfillSalesOrder request message
 *
 * Web API Action: FulfillSalesOrder
 */
export class FulfillSalesOrderRequest
  extends OrganizationRequest
  implements Executable<FulfillSalesOrderResponse>
{
  constructor(
    public orderClose: orderclose,
    public status: number
  ) {
    super("FulfillSalesOrder");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<FulfillSalesOrderResponse> {
    // No return value (204 No Content)
    return new FulfillSalesOrderResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OrderClose: this.orderClose,
      Status: this.status,
    };
  }
}

/**
 * FulfillSalesOrder response message
 */
export class FulfillSalesOrderResponse extends OrganizationResponse {
  constructor() {
    super("FulfillSalesOrder");
  }

  static fromResponse(_data: unknown): FulfillSalesOrderResponse {
    return new FulfillSalesOrderResponse();
  }
}
