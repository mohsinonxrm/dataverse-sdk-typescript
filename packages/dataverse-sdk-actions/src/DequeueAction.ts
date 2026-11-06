import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from Dequeue action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface DequeueResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
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
    public readonly request?: string
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
