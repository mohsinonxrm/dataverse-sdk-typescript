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
 *
 * The first argument is the id of the product record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CloneProductResponse;
    return (await response.json()) as CloneProductResponse;
  }
}
