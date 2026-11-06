import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CloneProductResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CloneProductResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CloneProduct action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CloneProductResult =
  (product & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * CloneProduct response message
 *
 * `result` is the value the CloneProduct action returns (see {@link CloneProductResult}).
 */
export class CloneProductResponse extends OrganizationResponse {
  constructor(public result: CloneProductResult) {
    super("CloneProduct");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CloneProductResponse {
    return new CloneProductResponse((data ?? null) as CloneProductResult);
  }
}
