import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { product } from "./types/index.js";

/**
 * CloneProduct request message
 *
 * Web API Action: CloneProduct
 *
 * The first argument is the id of the product record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CloneProductResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CloneProductResponse.fromResponse({});
    return CloneProductResponse.fromResponse(await response.json());
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
    return new CloneProductResponse(responseObject<product>(data));
  }
}
