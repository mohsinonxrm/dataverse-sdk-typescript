import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { product } from "./types/index.js";

/**
 * CloneProduct request message
 *
 * Web API Action: CloneProduct
 */
export class CloneProductRequest
  extends OrganizationRequest
  implements Executable<CloneProductResponse>
{
  constructor(public productId: string) {
    super("CloneProduct");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/products(${this.productId})/Microsoft.Dynamics.CRM.CloneProduct`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CloneProductResponse> {
    const data = await response.json();
    return CloneProductResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.productId,
    };
  }
}

/**
 * CloneProduct response message
 */
export class CloneProductResponse extends OrganizationResponse {
  constructor(public result: product) {
    super("CloneProduct");
  }

  static fromResponse(data: unknown): CloneProductResponse {
    return new CloneProductResponse((data as any).value);
  }
}
