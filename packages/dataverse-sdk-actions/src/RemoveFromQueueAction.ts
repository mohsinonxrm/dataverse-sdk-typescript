import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RemoveFromQueue action
 */
export interface RemoveFromQueueResponse {
  // No content returned
}

/**
 * RemoveFromQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queueitem)
 */
export class RemoveFromQueueAction implements Executable<RemoveFromQueueResponse> {
  constructor(public readonly queueitemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.RemoveFromQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RemoveFromQueueResponse> {
    // No return value (204 No Content)
    return {};
  }
}
