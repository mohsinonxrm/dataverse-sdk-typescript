import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Parameters of the PickFromQueue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PickFromQueueRequestParameters {
  SystemUser: EntityReference | EntityPayload<systemuser>;
  RemoveQueueItem: boolean;
}

/**
 * PickFromQueue request message
 *
 * Web API Action: PickFromQueue
 *
 * The first argument is the id of the queueitem record to call it on.
 */
export class PickFromQueueRequest
  extends OrganizationRequest
  implements Executable<PickFromQueueResponse>
{
  declare readonly Parameters: Readonly<PickFromQueueRequestParameters>;

  constructor(
    public queueitemId: string,
    parameters: PickFromQueueRequestParameters
  ) {
    super("PickFromQueue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.PickFromQueue`;

    const body = requestBody({
      SystemUser: this.Parameters.SystemUser,
      RemoveQueueItem: this.Parameters.RemoveQueueItem,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<PickFromQueueResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new PickFromQueueResponse());
  }
}

/**
 * PickFromQueue response message
 */
export class PickFromQueueResponse extends OrganizationResponse {
  constructor() {
    super("PickFromQueue");
  }

  static fromResponse(_data?: unknown): PickFromQueueResponse {
    return new PickFromQueueResponse();
  }
}
