import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  AddToQueueResponse as AddToQueueResponseData,
  queue,
  queueitem,
} from "./types/index.js";

/**
 * Parameters of the AddToQueue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddToQueueRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  SourceQueue?: EntityReference | EntityPayload<queue>;
  QueueItemProperties?: EntityReference | EntityPayload<queueitem>;
}

/**
 * AddToQueue request message
 *
 * Web API Action: AddToQueue
 *
 * The first argument is the id of the queue record to call it on.
 */
export class AddToQueueRequest
  extends OrganizationRequest
  implements Executable<AddToQueueResponse>
{
  declare readonly Parameters: Readonly<AddToQueueRequestParameters>;

  constructor(
    public queueId: string,
    parameters: AddToQueueRequestParameters
  ) {
    super("AddToQueue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queues(${this.queueId})/Microsoft.Dynamics.CRM.AddToQueue`;

    const body = requestBody({
      Target: this.Parameters.Target,
      SourceQueue: this.Parameters.SourceQueue,
      QueueItemProperties: this.Parameters.QueueItemProperties,
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
    return AddToQueueResponse.fromResponse(text ? JSON.parse(text) : {});
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
