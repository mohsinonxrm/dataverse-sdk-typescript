import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { ColumnSet, salesorder } from "./types/index.js";

/**
 * Response from ConvertQuoteToSalesOrder action
 */
export interface ConvertQuoteToSalesOrderResponse {
  value: salesorder;
}

/**
 * ConvertQuoteToSalesOrder action
 *
 * Unbound action
 */
export class ConvertQuoteToSalesOrderAction implements Executable<ConvertQuoteToSalesOrderResponse> {
  constructor(
    public readonly quoteId: string,
    public readonly columnSet: ColumnSet,
    public readonly quoteCloseDate: string,
    public readonly quoteCloseStatus: number,
    public readonly quoteCloseSubject: string,
    public readonly quoteCloseDescription: string,
    public readonly processInstanceId: EntityReference
  ) {}

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
    return data as ConvertQuoteToSalesOrderResponse;
  }
}
