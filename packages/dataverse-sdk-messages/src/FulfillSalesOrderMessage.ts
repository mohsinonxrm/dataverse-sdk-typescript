import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
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
    public orderClose: EntityReference | EntityPayload<orderclose>,
    public status: number
  ) {
    super("FulfillSalesOrder");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/salesorders/Microsoft.Dynamics.CRM.FulfillSalesOrder`;

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
