import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { product } from "./types/index.js";

/**
 * Response from CloneProduct action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CloneProductResponse extends product {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CloneProduct action
 *
 * Bound action
 * Binding parameter: entity (mscrm.product)
 */
export class CloneProductAction implements Executable<CloneProductResponse> {
  constructor(public readonly productId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/products(${this.productId})/Microsoft.Dynamics.CRM.CloneProduct`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CloneProductResponse> {
    const data = await response.json();
    return data as CloneProductResponse;
  }
}
