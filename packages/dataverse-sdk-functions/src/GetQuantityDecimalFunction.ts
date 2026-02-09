import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { product, uom } from "./types/index.js";

/**
 * Response from GetQuantityDecimal function
 */
export interface GetQuantityDecimalResponse {
  Quantity: number;
}

/**
 * GetQuantityDecimal function
 *
 * Bound function
 * Binding parameter: entity (mscrm.salesorder)
 */
export class GetQuantityDecimalFunction implements Executable<GetQuantityDecimalResponse> {
  constructor(
    public readonly salesorderId: string,
    public readonly product: product,
    public readonly uoM: uom
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/salesorders(${this.salesorderId})/Microsoft.Dynamics.CRM.GetQuantityDecimal`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.product !== undefined) {
      aliases.push(`Product=@p1`);
      params.append("@p1", JSON.stringify(this.product));
    }
    if (this.uoM !== undefined) {
      aliases.push(`UoM=@p2`);
      params.append("@p2", JSON.stringify(this.uoM));
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

  async parseResponse(response: Response): Promise<GetQuantityDecimalResponse> {
    const data = await response.json();
    return data as GetQuantityDecimalResponse;
  }
}
