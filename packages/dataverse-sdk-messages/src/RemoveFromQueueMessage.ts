import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RemoveFromQueue request message
 *
 * Web API Action: RemoveFromQueue
 */
export class RemoveFromQueueRequest
  extends OrganizationRequest
  implements Executable<RemoveFromQueueResponse>
{
  constructor(public queueitemId: string) {
    super("RemoveFromQueue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.RemoveFromQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RemoveFromQueueResponse> {
    // No return value (204 No Content)
    return new RemoveFromQueueResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.queueitemId,
    };
  }
}

/**
 * RemoveFromQueue response message
 */
export class RemoveFromQueueResponse extends OrganizationResponse {
  constructor() {
    super("RemoveFromQueue");
  }

  static fromResponse(_data: unknown): RemoveFromQueueResponse {
    return new RemoveFromQueueResponse();
  }
}
