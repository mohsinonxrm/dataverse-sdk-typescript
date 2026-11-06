import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CancelSalesOrder action
 */
export interface CancelSalesOrderResponse {
  // No content returned
}

/**
 * Parameters of the CancelSalesOrder action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CancelSalesOrderActionParameters {
  OrderClose: EntityReference | AnyEntityPayload;
  Status: number;
}

/**
 * CancelSalesOrder action
 *
 * Unbound action
 */
export class CancelSalesOrderAction implements Executable<CancelSalesOrderResponse> {
  constructor(public readonly parameters: CancelSalesOrderActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CancelSalesOrder`;

    const body = requestBody({
      OrderClose: this.parameters.OrderClose,
      Status: this.parameters.Status,
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

  async parseResponse(response: Response): Promise<CancelSalesOrderResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CancelSalesOrderResponse;
  }
}
