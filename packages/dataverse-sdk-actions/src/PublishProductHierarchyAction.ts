import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PublishProductHierarchy action
 */
export interface PublishProductHierarchyResponse {
  // No content returned
}

/**
 * PublishProductHierarchy action
 *
 * Bound action
 * Binding parameter: entity (mscrm.product)
 *
 * The first argument is the id of the product record to call it on.
 */
export class PublishProductHierarchyAction implements Executable<PublishProductHierarchyResponse> {
  constructor(public readonly productId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/products(${this.productId})/Microsoft.Dynamics.CRM.PublishProductHierarchy`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishProductHierarchyResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PublishProductHierarchyResponse;
  }
}
