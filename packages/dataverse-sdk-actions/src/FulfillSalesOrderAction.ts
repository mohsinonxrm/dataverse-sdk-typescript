import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { orderclose } from "./types/index.js";

/**
 * Response from FulfillSalesOrder action
 */
export interface FulfillSalesOrderResponse {
  // No content returned
}

/**
 * Parameters of the FulfillSalesOrder action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FulfillSalesOrderActionParameters {
  OrderClose: EntityReference | EntityPayload<orderclose>;
  Status: number;
}

/**
 * FulfillSalesOrder action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.salesorder))
 */
export class FulfillSalesOrderAction implements Executable<FulfillSalesOrderResponse> {
  constructor(public readonly parameters: FulfillSalesOrderActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/salesorders/Microsoft.Dynamics.CRM.FulfillSalesOrder`;

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

  async parseResponse(response: Response): Promise<FulfillSalesOrderResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as FulfillSalesOrderResponse;
    return (await response.json()) as FulfillSalesOrderResponse;
  }
}
