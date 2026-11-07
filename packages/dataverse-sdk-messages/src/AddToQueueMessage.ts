import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { queue, queueitem } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return AddToQueueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddToQueue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddToQueueResult {
  "@odata.context"?: string;
  QueueItemId: string;
}

/**
 * AddToQueue response message
 *
 * `result` is the value the AddToQueue action returns (see {@link AddToQueueResult}).
 */
export class AddToQueueResponse extends OrganizationResponse {
  constructor(public result: AddToQueueResult) {
    super("AddToQueue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddToQueueResponse {
    return new AddToQueueResponse(data as AddToQueueResult);
  }
}
