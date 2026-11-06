import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ComputeSlaWorkQueueItem action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ComputeSlaWorkQueueItemResponse = void;

/**
 * ComputeSlaWorkQueueItem action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueue)
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class ComputeSlaWorkQueueItemAction implements Executable<ComputeSlaWorkQueueItemResponse> {
  constructor(public readonly workqueueId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.ComputeSlaWorkQueueItem`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<ComputeSlaWorkQueueItemResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
