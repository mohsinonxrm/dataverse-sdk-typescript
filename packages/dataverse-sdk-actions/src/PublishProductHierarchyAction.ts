import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PublishProductHierarchy action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PublishProductHierarchyResponse = void;

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
    const url = `${baseUrl}/products(${odataLiteral.guid(this.productId)})/Microsoft.Dynamics.CRM.PublishProductHierarchy`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<PublishProductHierarchyResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
