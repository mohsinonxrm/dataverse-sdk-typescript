import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from Dequeue action
 */
export interface DequeueResponse {
  value: EntityReference;
}

/**
 * Dequeue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueue)
 */
export class DequeueAction implements Executable<DequeueResponse> {
  constructor(
    public readonly workqueueId: string,
    public readonly request: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.Dequeue`;

    const body: Record<string, unknown> = {
      request: this.request,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DequeueResponse> {
    const data = await response.json();
    return data as DequeueResponse;
  }
}
