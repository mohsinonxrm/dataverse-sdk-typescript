import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { product, uom } from "./types/index.js";

/**
 * Response from GetQuantityDecimal function
 */
export interface GetQuantityDecimal_opportunityResponse {
  Quantity: number;
}

/**
 * GetQuantityDecimal function
 *
 * Bound function
 * Binding parameter: entity (mscrm.opportunity)
 */
export class GetQuantityDecimal_opportunityFunction implements Executable<GetQuantityDecimal_opportunityResponse> {
  constructor(
    public readonly opportunityId: string,
    public readonly product: product,
    public readonly uoM: uom
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/opportunities(${this.opportunityId})/Microsoft.Dynamics.CRM.GetQuantityDecimal`;

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

  async parseResponse(response: Response): Promise<GetQuantityDecimal_opportunityResponse> {
    const data = await response.json();
    return data as GetQuantityDecimal_opportunityResponse;
  }
}
