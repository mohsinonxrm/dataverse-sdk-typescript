import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * QueueUpdateRibbonClientMetadata request message
 *
 * Web API Action: QueueUpdateRibbonClientMetadata
 */
export class QueueUpdateRibbonClientMetadataRequest
  extends OrganizationRequest
  implements Executable<QueueUpdateRibbonClientMetadataResponse>
{
  constructor() {
    super("QueueUpdateRibbonClientMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueueUpdateRibbonClientMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<QueueUpdateRibbonClientMetadataResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new QueueUpdateRibbonClientMetadataResponse());
  }
}

/**
 * QueueUpdateRibbonClientMetadata response message
 */
export class QueueUpdateRibbonClientMetadataResponse extends OrganizationResponse {
  constructor() {
    super("QueueUpdateRibbonClientMetadata");
  }

  static fromResponse(_data?: unknown): QueueUpdateRibbonClientMetadataResponse {
    return new QueueUpdateRibbonClientMetadataResponse();
  }
}
