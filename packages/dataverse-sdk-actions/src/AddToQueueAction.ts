import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { queue, queueitem } from "./types/index.js";

/**
 * Response from AddToQueue action
 */
export interface AddToQueueResponse {
  QueueItemId: string;
}

/**
 * Parameters of the AddToQueue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddToQueueActionParameters {
  Target: EntityReference | AnyEntityPayload;
  SourceQueue?: EntityReference | EntityPayload<queue>;
  QueueItemProperties?: EntityReference | EntityPayload<queueitem>;
}

/**
 * AddToQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queue)
 *
 * The first argument is the id of the queue record to call it on.
 */
export class AddToQueueAction implements Executable<AddToQueueResponse> {
  constructor(
    public readonly queueId: string,
    public readonly parameters: AddToQueueActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queues(${this.queueId})/Microsoft.Dynamics.CRM.AddToQueue`;

    const body = requestBody({
      Target: this.parameters.Target,
      SourceQueue: this.parameters.SourceQueue,
      QueueItemProperties: this.parameters.QueueItemProperties,
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

  async parseResponse(response: Response): Promise<AddToQueueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddToQueueResponse;
  }
}
