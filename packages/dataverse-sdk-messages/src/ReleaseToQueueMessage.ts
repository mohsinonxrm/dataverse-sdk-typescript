import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ReleaseToQueue request message
 *
 * Web API Action: ReleaseToQueue
 *
 * The first argument is the id of the queueitem record to call it on.
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
    const url = `${baseUrl}/queueitems(${odataLiteral.guid(this.queueitemId)})/Microsoft.Dynamics.CRM.ReleaseToQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<ReleaseToQueueResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ReleaseToQueueResponse());
  }
}

/**
 * ReleaseToQueue response message
 */
export class ReleaseToQueueResponse extends OrganizationResponse {
  constructor() {
    super("ReleaseToQueue");
  }

  static fromResponse(_data?: unknown): ReleaseToQueueResponse {
    return new ReleaseToQueueResponse();
  }
}
