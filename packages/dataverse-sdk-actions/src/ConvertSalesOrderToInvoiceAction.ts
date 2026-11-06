import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * ConvertSalesOrderToInvoice action
 *
 * Unbound action
 */
export class ConvertSalesOrderToInvoiceAction implements Executable<ConvertSalesOrderToInvoiceResponse> {
  constructor(
    public readonly salesOrderId: string,
    public readonly columnSet: ColumnSet,
    public readonly processInstanceId: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConvertSalesOrderToInvoice`;

    const body: Record<string, unknown> = {
      SalesOrderId: this.salesOrderId,
      ColumnSet: this.columnSet,
      ProcessInstanceId: this.processInstanceId,
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

  async parseResponse(response: Response): Promise<ConvertSalesOrderToInvoiceResponse> {
    const data = await response.json();
    return data as ConvertSalesOrderToInvoiceResponse;
  }
}
