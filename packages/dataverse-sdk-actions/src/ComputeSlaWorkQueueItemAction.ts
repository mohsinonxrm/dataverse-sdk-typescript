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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ComputeSlaWorkQueueItemResponse> {
    // No return value (204 No Content)
    return {};
  }
}
