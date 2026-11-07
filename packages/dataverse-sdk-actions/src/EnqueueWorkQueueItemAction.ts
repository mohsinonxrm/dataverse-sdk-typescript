import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the EnqueueWorkQueueItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface EnqueueWorkQueueItemResponse {
  "@odata.context"?: string;
  workQueueItemId: string;
}

/**
 * Parameters of the EnqueueWorkQueueItem action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface EnqueueWorkQueueItemActionParameters {
  returnCreated?: boolean;
  workQueueItem: EntityReference | AnyEntityPayload;
}

/**
 * EnqueueWorkQueueItem action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueue)
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class EnqueueWorkQueueItemAction implements Executable<EnqueueWorkQueueItemResponse> {
  constructor(
    public readonly workqueueId: string,
    public readonly parameters: EnqueueWorkQueueItemActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.EnqueueWorkQueueItem`;

    const body = requestBody({
      returnCreated: this.parameters.returnCreated,
      workQueueItem: this.parameters.workQueueItem,
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
    return (await response.json()) as EnqueueWorkQueueItemResponse;
  }
}
