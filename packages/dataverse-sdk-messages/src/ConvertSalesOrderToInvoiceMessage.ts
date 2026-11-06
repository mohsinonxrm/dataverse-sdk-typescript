import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet, invoice } from "./types/index.js";

/**
 * Parameters of the ConvertSalesOrderToInvoice message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConvertSalesOrderToInvoiceRequestParameters {
  SalesOrderId: string;
  ColumnSet?: ColumnSet;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
}

/**
 * ConvertSalesOrderToInvoice request message
 *
 * Web API Action: ConvertSalesOrderToInvoice
 */
export class ConvertSalesOrderToInvoiceRequest
  extends OrganizationRequest
  implements Executable<ConvertSalesOrderToInvoiceResponse>
{
  declare readonly Parameters: Readonly<ConvertSalesOrderToInvoiceRequestParameters>;

  constructor(parameters: ConvertSalesOrderToInvoiceRequestParameters) {
    super("ConvertSalesOrderToInvoice", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConvertSalesOrderToInvoice`;

    const body = requestBody({
      SalesOrderId: this.Parameters.SalesOrderId,
      ColumnSet: enumBody(this.Parameters.ColumnSet, "ColumnSet"),
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

  async parseResponse(response: Response): Promise<ConvertSalesOrderToInvoiceResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return ConvertSalesOrderToInvoiceResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ConvertSalesOrderToInvoiceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ConvertSalesOrderToInvoice action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ConvertSalesOrderToInvoiceResult =
  (invoice & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * ConvertSalesOrderToInvoice response message
 *
 * `result` is the value the ConvertSalesOrderToInvoice action returns (see {@link ConvertSalesOrderToInvoiceResult}).
 */
export class ConvertSalesOrderToInvoiceResponse extends OrganizationResponse {
  constructor(public result: ConvertSalesOrderToInvoiceResult) {
    super("ConvertSalesOrderToInvoice");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ConvertSalesOrderToInvoiceResponse {
    return new ConvertSalesOrderToInvoiceResponse(
      (data ?? null) as ConvertSalesOrderToInvoiceResult
    );
  }
}
