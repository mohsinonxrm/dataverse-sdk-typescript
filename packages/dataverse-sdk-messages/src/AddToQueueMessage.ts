import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  AddToQueueResponse as AddToQueueResponseData,
  queue,
  queueitem,
} from "./types/index.js";

/**
 * AddToQueue request message
 *
 * Web API Action: AddToQueue
 */
export class AddToQueueRequest
  extends OrganizationRequest
  implements Executable<AddToQueueResponse>
{
  constructor(
    public queueId: string,
    public target: EntityReference | AnyEntityPayload,
    public sourceQueue?: EntityReference | EntityPayload<queue>,
    public queueItemProperties?: EntityReference | EntityPayload<queueitem>
  ) {
    super("AddToQueue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queues(${this.queueId})/Microsoft.Dynamics.CRM.AddToQueue`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SourceQueue: this.sourceQueue,
      QueueItemProperties: this.queueItemProperties,
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

  async parseResponse(response: Response): Promise<AddToQueueResponse> {
    const data = await response.json();
    return AddToQueueResponse.fromResponse(data);
  }
}

/**
 * AddToQueue response message
 */
export class AddToQueueResponse extends OrganizationResponse {
  constructor(public result: AddToQueueResponseData) {
    super("AddToQueue");
  }

  static fromResponse(data: unknown): AddToQueueResponse {
    return new AddToQueueResponse(responseObject<AddToQueueResponseData>(data));
  }
}
