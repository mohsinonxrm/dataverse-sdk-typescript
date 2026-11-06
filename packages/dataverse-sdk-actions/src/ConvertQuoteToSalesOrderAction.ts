import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet, salesorder } from "./types/index.js";

/**
 * Response from ConvertQuoteToSalesOrder action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ConvertQuoteToSalesOrderResponse extends salesorder {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the ConvertQuoteToSalesOrder action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConvertQuoteToSalesOrderActionParameters {
  QuoteId: string;
  ColumnSet?: ColumnSet;
  QuoteCloseDate?: string;
  QuoteCloseStatus?: number;
  QuoteCloseSubject?: string;
  QuoteCloseDescription?: string;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
}

/**
 * ConvertQuoteToSalesOrder action
 *
 * Unbound action
 */
export class ConvertQuoteToSalesOrderAction implements Executable<ConvertQuoteToSalesOrderResponse> {
  constructor(public readonly parameters: ConvertQuoteToSalesOrderActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConvertQuoteToSalesOrder`;

    const body = requestBody({
      QuoteId: this.parameters.QuoteId,
      ColumnSet: enumBody(this.parameters.ColumnSet, "ColumnSet"),
      QuoteCloseDate: this.parameters.QuoteCloseDate,
      QuoteCloseStatus: this.parameters.QuoteCloseStatus,
      QuoteCloseSubject: this.parameters.QuoteCloseSubject,
      QuoteCloseDescription: this.parameters.QuoteCloseDescription,
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

  async parseResponse(response: Response): Promise<ConvertQuoteToSalesOrderResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ConvertQuoteToSalesOrderResponse;
    return (await response.json()) as ConvertQuoteToSalesOrderResponse;
  }
}
