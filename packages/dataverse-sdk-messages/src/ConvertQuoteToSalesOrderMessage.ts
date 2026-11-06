import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet, salesorder } from "./types/index.js";

/**
 * Parameters of the ConvertQuoteToSalesOrder message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConvertQuoteToSalesOrderRequestParameters {
  QuoteId: string;
  ColumnSet?: ColumnSet;
  QuoteCloseDate?: string;
  QuoteCloseStatus?: number;
  QuoteCloseSubject?: string;
  QuoteCloseDescription?: string;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
}

/**
 * ConvertQuoteToSalesOrder request message
 *
 * Web API Action: ConvertQuoteToSalesOrder
 */
export class ConvertQuoteToSalesOrderRequest
  extends OrganizationRequest
  implements Executable<ConvertQuoteToSalesOrderResponse>
{
  declare readonly Parameters: Readonly<ConvertQuoteToSalesOrderRequestParameters>;

  constructor(parameters: ConvertQuoteToSalesOrderRequestParameters) {
    super("ConvertQuoteToSalesOrder", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConvertQuoteToSalesOrder`;

    const body = requestBody({
      QuoteId: this.Parameters.QuoteId,
      ColumnSet: enumBody(this.Parameters.ColumnSet, "ColumnSet"),
      QuoteCloseDate: this.Parameters.QuoteCloseDate,
      QuoteCloseStatus: this.Parameters.QuoteCloseStatus,
      QuoteCloseSubject: this.Parameters.QuoteCloseSubject,
      QuoteCloseDescription: this.Parameters.QuoteCloseDescription,
      ProcessInstanceId: this.Parameters.ProcessInstanceId,
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
    if (response.status === 204) return ConvertQuoteToSalesOrderResponse.fromResponse({});
    return ConvertQuoteToSalesOrderResponse.fromResponse(await response.json());
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
    return new ConvertQuoteToSalesOrderResponse(responseObject<salesorder>(data));
  }
}
