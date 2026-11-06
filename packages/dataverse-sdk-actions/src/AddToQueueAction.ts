import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { queue, queueitem } from "./types/index.js";

/**
 * Response from AddToQueue action
 */
export interface AddToQueueResponse {
  QueueItemId: string;
}

/**
 * AddToQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queue)
 */
export class AddToQueueAction implements Executable<AddToQueueResponse> {
  constructor(
    public readonly queueId: string,
    public readonly target: EntityReference | AnyEntityPayload,
    public readonly sourceQueue?: EntityReference | EntityPayload<queue>,
    public readonly queueItemProperties?: EntityReference | EntityPayload<queueitem>
  ) {}

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
    return data as AddToQueueResponse;
  }
}
