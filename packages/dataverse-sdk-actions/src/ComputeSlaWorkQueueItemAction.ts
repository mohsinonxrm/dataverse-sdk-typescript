import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ComputeSlaWorkQueueItem action
 */
export interface ComputeSlaWorkQueueItemResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<ComputeSlaWorkQueueItemResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ComputeSlaWorkQueueItemResponse;
  }
}
