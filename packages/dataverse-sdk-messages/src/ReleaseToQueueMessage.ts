import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ReleaseToQueue request message
 *
 * Web API Action: ReleaseToQueue
 */
export class ReleaseToQueueRequest
  extends OrganizationRequest
  implements Executable<ReleaseToQueueResponse>
{
  constructor(public queueitemId: string) {
    super("ReleaseToQueue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.ReleaseToQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ReleaseToQueueResponse> {
    // No return value (204 No Content)
    return new ReleaseToQueueResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.queueitemId,
    };
  }
}

/**
 * ReleaseToQueue response message
 */
export class ReleaseToQueueResponse extends OrganizationResponse {
  constructor() {
    super("ReleaseToQueue");
  }

  static fromResponse(_data: unknown): ReleaseToQueueResponse {
    return new ReleaseToQueueResponse();
  }
}
