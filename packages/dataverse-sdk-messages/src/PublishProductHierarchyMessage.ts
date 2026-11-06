import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PublishProductHierarchy request message
 *
 * Web API Action: PublishProductHierarchy
 *
 * The first argument is the id of the product record to call it on.
 */
export class PublishProductHierarchyRequest
  extends OrganizationRequest
  implements Executable<PublishProductHierarchyResponse>
{
  constructor(public productId: string) {
    super("PublishProductHierarchy");
  }

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

  parseResponse(_response: Response): Promise<PublishProductHierarchyResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new PublishProductHierarchyResponse());
  }
}

/**
 * PublishProductHierarchy response message
 */
export class PublishProductHierarchyResponse extends OrganizationResponse {
  constructor() {
    super("PublishProductHierarchy");
  }

  static fromResponse(_data?: unknown): PublishProductHierarchyResponse {
    return new PublishProductHierarchyResponse();
  }
}
