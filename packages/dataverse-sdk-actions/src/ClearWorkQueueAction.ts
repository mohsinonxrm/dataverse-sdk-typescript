import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ClearWorkQueue action
 */
export interface ClearWorkQueueResponse {
  isDeletionGoingAsync: boolean;
}

/**
 * ClearWorkQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueue)
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class ClearWorkQueueAction implements Executable<ClearWorkQueueResponse> {
  constructor(public readonly workqueueId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.ClearWorkQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ClearWorkQueueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ClearWorkQueueResponse;
    return (await response.json()) as ClearWorkQueueResponse;
  }
}
