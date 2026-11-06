import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { product, uom } from "./types/index.js";

/**
 * Response from GetQuantityDecimal function
 */
export interface GetQuantityDecimal_salesorderResponse {
  Quantity: number;
}

/**
 * Parameters of the GetQuantityDecimal function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetQuantityDecimal_salesorderFunctionParameters {
  Product: product;
  UoM: uom;
}

/**
 * GetQuantityDecimal function
 *
 * Bound function
 * Binding parameter: entity (mscrm.salesorder)
 *
 * The first argument is the id of the salesorder record to call it on.
 */
export class GetQuantityDecimal_salesorderFunction implements Executable<GetQuantityDecimal_salesorderResponse> {
  constructor(
    public readonly salesorderId: string,
    public readonly parameters: GetQuantityDecimal_salesorderFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/salesorders(${this.salesorderId})/Microsoft.Dynamics.CRM.GetQuantityDecimal`;

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

  async parseResponse(response: Response): Promise<GetQuantityDecimal_salesorderResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetQuantityDecimal_salesorderResponse;
    return (await response.json()) as GetQuantityDecimal_salesorderResponse;
  }
}
