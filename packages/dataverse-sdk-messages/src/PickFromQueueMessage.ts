import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * PickFromQueue request message
 *
 * Web API Action: PickFromQueue
 */
export class PickFromQueueRequest
  extends OrganizationRequest
  implements Executable<PickFromQueueResponse>
{
  constructor(
    public queueitemId: string,
    public systemUser: EntityReference | EntityPayload<systemuser>,
    public removeQueueItem: boolean
  ) {
    super("PickFromQueue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.PickFromQueue`;

    const body: Record<string, unknown> = {
      SystemUser: this.systemUser,
      RemoveQueueItem: this.removeQueueItem,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PickFromQueueResponse> {
    // No return value (204 No Content)
    return new PickFromQueueResponse();
  }
}

/**
 * PickFromQueue response message
 */
export class PickFromQueueResponse extends OrganizationResponse {
  constructor() {
    super("PickFromQueue");
  }

  static fromResponse(_data: unknown): PickFromQueueResponse {
    return new PickFromQueueResponse();
  }
}
