import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet, invoice } from "./types/index.js";

/**
 * Response from ConvertSalesOrderToInvoice action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ConvertSalesOrderToInvoiceResponse extends invoice {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the ConvertSalesOrderToInvoice action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConvertSalesOrderToInvoiceActionParameters {
  SalesOrderId: string;
  ColumnSet?: ColumnSet;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
}

/**
 * ConvertSalesOrderToInvoice action
 *
 * Unbound action
 */
export class ConvertSalesOrderToInvoiceAction implements Executable<ConvertSalesOrderToInvoiceResponse> {
  constructor(public readonly parameters: ConvertSalesOrderToInvoiceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConvertSalesOrderToInvoice`;

    const body = requestBody({
      SalesOrderId: this.parameters.SalesOrderId,
      ColumnSet: enumBody(this.parameters.ColumnSet, "ColumnSet"),
      ProcessInstanceId: this.parameters.ProcessInstanceId,
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

  async parseResponse(response: Response): Promise<ConvertSalesOrderToInvoiceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ConvertSalesOrderToInvoiceResponse;
    return (await response.json()) as ConvertSalesOrderToInvoiceResponse;
  }
}
