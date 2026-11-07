import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ClearWorkQueue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ClearWorkQueueResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ClearWorkQueueResponse;
  }
}
