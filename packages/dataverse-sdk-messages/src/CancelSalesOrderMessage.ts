import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CancelSalesOrder message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CancelSalesOrderRequestParameters {
  OrderClose: EntityReference | AnyEntityPayload;
  Status: number;
}

/**
 * CancelSalesOrder request message
 *
 * Web API Action: CancelSalesOrder
 */
export class CancelSalesOrderRequest
  extends OrganizationRequest
  implements Executable<CancelSalesOrderResponse>
{
  declare readonly Parameters: Readonly<CancelSalesOrderRequestParameters>;

  constructor(parameters: CancelSalesOrderRequestParameters) {
    super("CancelSalesOrder", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CancelSalesOrder`;

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

  parseResponse(_response: Response): Promise<CancelSalesOrderResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CancelSalesOrderResponse());
  }
}

/**
 * CancelSalesOrder response message
 */
export class CancelSalesOrderResponse extends OrganizationResponse {
  constructor() {
    super("CancelSalesOrder");
  }

  static fromResponse(_data?: unknown): CancelSalesOrderResponse {
    return new CancelSalesOrderResponse();
  }
}
