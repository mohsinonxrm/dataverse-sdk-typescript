import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CancelSalesOrder action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CancelSalesOrderResponse = void;

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

  parseResponse(_response: Response): Promise<CancelSalesOrderResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
