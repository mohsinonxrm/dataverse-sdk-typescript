import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
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
    // 204 No Content is an empty result
    if (response.status === 204) return ConvertSalesOrderToInvoiceResponse.fromResponse({});
    return ConvertSalesOrderToInvoiceResponse.fromResponse(await response.json());
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
    return new ConvertSalesOrderToInvoiceResponse(responseObject<invoice>(data));
  }
}
