import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { queue, queueitem } from "./types/index.js";

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
    public target: EntityReference,
    public sourceQueue: queue,
    public queueItemProperties: queueitem
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddToQueueResponse> {
    const data = await response.json();
    return AddToQueueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.queueId,
      Target: this.target,
      SourceQueue: this.sourceQueue,
      QueueItemProperties: this.queueItemProperties,
    };
  }
}

/**
 * AddToQueue response message
 */
export class AddToQueueResponse extends OrganizationResponse {
  constructor(public result: AddToQueueResponse) {
    super("AddToQueue");
  }

  static fromResponse(data: unknown): AddToQueueResponse {
    return new AddToQueueResponse((data as any).value);
  }
}
