import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the EnqueueWorkQueueItem message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface EnqueueWorkQueueItemRequestParameters {
  returnCreated?: boolean;
  workQueueItem: EntityReference | AnyEntityPayload;
}

/**
 * EnqueueWorkQueueItem request message
 *
 * Web API Action: EnqueueWorkQueueItem
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class EnqueueWorkQueueItemRequest
  extends OrganizationRequest
  implements Executable<EnqueueWorkQueueItemResponse>
{
  declare readonly Parameters: Readonly<EnqueueWorkQueueItemRequestParameters>;

  constructor(
    public workqueueId: string,
    parameters: EnqueueWorkQueueItemRequestParameters
  ) {
    super("EnqueueWorkQueueItem", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.EnqueueWorkQueueItem`;

    const body = requestBody({
      returnCreated: this.Parameters.returnCreated,
      workQueueItem: this.Parameters.workQueueItem,
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

  async parseResponse(response: Response): Promise<EnqueueWorkQueueItemResponse> {
    // The body is the complex value, with its @odata.context
    return EnqueueWorkQueueItemResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the EnqueueWorkQueueItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface EnqueueWorkQueueItemResult {
  "@odata.context"?: string;
  workQueueItemId: string;
}

/**
 * EnqueueWorkQueueItem response message
 *
 * `result` is the value the EnqueueWorkQueueItem action returns (see {@link EnqueueWorkQueueItemResult}).
 */
export class EnqueueWorkQueueItemResponse extends OrganizationResponse {
  constructor(public result: EnqueueWorkQueueItemResult) {
    super("EnqueueWorkQueueItem");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): EnqueueWorkQueueItemResponse {
    return new EnqueueWorkQueueItemResponse(data as EnqueueWorkQueueItemResult);
  }
}
