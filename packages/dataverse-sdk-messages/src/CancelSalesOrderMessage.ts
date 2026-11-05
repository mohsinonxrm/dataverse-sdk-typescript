import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CancelSalesOrder request message
 *
 * Web API Action: CancelSalesOrder
 */
export class CancelSalesOrderRequest
  extends OrganizationRequest
  implements Executable<CancelSalesOrderResponse>
{
  constructor(
    public orderClose: EntityReference,
    public status: number
  ) {
    super("CancelSalesOrder");
  }

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
    return new CancelSalesOrderResponse();
  }
}

/**
 * CancelSalesOrder response message
 */
export class CancelSalesOrderResponse extends OrganizationResponse {
  constructor() {
    super("CancelSalesOrder");
  }

  static fromResponse(_data: unknown): CancelSalesOrderResponse {
    return new CancelSalesOrderResponse();
  }
}
