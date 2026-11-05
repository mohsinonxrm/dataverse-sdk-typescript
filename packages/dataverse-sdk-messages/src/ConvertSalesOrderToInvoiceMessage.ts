import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { ColumnSet, invoice } from "./types/index.js";

/**
 * ConvertSalesOrderToInvoice request message
 *
 * Web API Action: ConvertSalesOrderToInvoice
 */
export class ConvertSalesOrderToInvoiceRequest
  extends OrganizationRequest
  implements Executable<ConvertSalesOrderToInvoiceResponse>
{
  constructor(
    public salesOrderId: string,
    public columnSet: ColumnSet,
    public processInstanceId: EntityReference
  ) {
    super("ConvertSalesOrderToInvoice");
  }

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
    return ConvertSalesOrderToInvoiceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SalesOrderId: this.salesOrderId,
      ColumnSet: this.columnSet,
      ProcessInstanceId: this.processInstanceId,
    };
  }
}

/**
 * ConvertSalesOrderToInvoice response message
 */
export class ConvertSalesOrderToInvoiceResponse extends OrganizationResponse {
  constructor(public result: invoice) {
    super("ConvertSalesOrderToInvoice");
  }

  static fromResponse(data: unknown): ConvertSalesOrderToInvoiceResponse {
    return new ConvertSalesOrderToInvoiceResponse((data as any).value);
  }
}
