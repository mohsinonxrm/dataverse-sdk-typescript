import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { product, uom } from "./types/index.js";

/**
 * Response from GetQuantityDecimal function
 */
export interface GetQuantityDecimal_invoiceResponse {
  Quantity: number;
}

/**
 * Parameters of the GetQuantityDecimal function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetQuantityDecimal_invoiceFunctionParameters {
  Product: product;
  UoM: uom;
}

/**
 * GetQuantityDecimal function
 *
 * Bound function
 * Binding parameter: entity (mscrm.invoice)
 *
 * The first argument is the id of the invoice record to call it on.
 */
export class GetQuantityDecimal_invoiceFunction implements Executable<GetQuantityDecimal_invoiceResponse> {
  constructor(
    public readonly invoiceId: string,
    public readonly parameters: GetQuantityDecimal_invoiceFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/invoices(${this.invoiceId})/Microsoft.Dynamics.CRM.GetQuantityDecimal`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Product !== undefined) {
      aliases.push(`Product=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.Product));
    }
    if (this.parameters.UoM !== undefined) {
      aliases.push(`UoM=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.UoM));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetQuantityDecimal_invoiceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetQuantityDecimal_invoiceResponse;
  }
}
