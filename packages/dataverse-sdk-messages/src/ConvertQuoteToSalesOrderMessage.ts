import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { ColumnSet, salesorder } from "./types/index.js";

/**
 * ConvertQuoteToSalesOrder request message
 *
 * Web API Action: ConvertQuoteToSalesOrder
 */
export class ConvertQuoteToSalesOrderRequest
  extends OrganizationRequest
  implements Executable<ConvertQuoteToSalesOrderResponse>
{
  constructor(
    public quoteId: string,
    public columnSet: ColumnSet,
    public quoteCloseDate: string,
    public quoteCloseStatus: number,
    public quoteCloseSubject: string,
    public quoteCloseDescription: string,
    public processInstanceId: EntityReference
  ) {
    super("ConvertQuoteToSalesOrder");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConvertQuoteToSalesOrder`;

    const body: Record<string, unknown> = {
      QuoteId: this.quoteId,
      ColumnSet: this.columnSet,
      QuoteCloseDate: this.quoteCloseDate,
      QuoteCloseStatus: this.quoteCloseStatus,
      QuoteCloseSubject: this.quoteCloseSubject,
      QuoteCloseDescription: this.quoteCloseDescription,
      ProcessInstanceId: this.processInstanceId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ConvertQuoteToSalesOrderResponse> {
    const data = await response.json();
    return ConvertQuoteToSalesOrderResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      QuoteId: this.quoteId,
      ColumnSet: this.columnSet,
      QuoteCloseDate: this.quoteCloseDate,
      QuoteCloseStatus: this.quoteCloseStatus,
      QuoteCloseSubject: this.quoteCloseSubject,
      QuoteCloseDescription: this.quoteCloseDescription,
      ProcessInstanceId: this.processInstanceId,
    };
  }
}

/**
 * ConvertQuoteToSalesOrder response message
 */
export class ConvertQuoteToSalesOrderResponse extends OrganizationResponse {
  constructor(public result: salesorder) {
    super("ConvertQuoteToSalesOrder");
  }

  static fromResponse(data: unknown): ConvertQuoteToSalesOrderResponse {
    return new ConvertQuoteToSalesOrderResponse((data as any).value);
  }
}
