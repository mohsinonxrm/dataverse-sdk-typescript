import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { orderclose } from "./types/index.js";

/**
 * Parameters of the FulfillSalesOrder message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FulfillSalesOrderRequestParameters {
  OrderClose: EntityReference | EntityPayload<orderclose>;
  Status: number;
}

/**
 * FulfillSalesOrder request message
 *
 * Web API Action: FulfillSalesOrder
 */
export class FulfillSalesOrderRequest
  extends OrganizationRequest
  implements Executable<FulfillSalesOrderResponse>
{
  declare readonly Parameters: Readonly<FulfillSalesOrderRequestParameters>;

  constructor(parameters: FulfillSalesOrderRequestParameters) {
    super("FulfillSalesOrder", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/salesorders/Microsoft.Dynamics.CRM.FulfillSalesOrder`;

    const body = requestBody({
      OrderClose: this.Parameters.OrderClose,
      Status: this.Parameters.Status,
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

  parseResponse(_response: Response): Promise<FulfillSalesOrderResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new FulfillSalesOrderResponse());
  }
}

/**
 * FulfillSalesOrder response message
 */
export class FulfillSalesOrderResponse extends OrganizationResponse {
  constructor() {
    super("FulfillSalesOrder");
  }

  static fromResponse(_data?: unknown): FulfillSalesOrderResponse {
    return new FulfillSalesOrderResponse();
  }
}
