import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { systemuser } from "./types/index.js";

/**
 * Response from PickFromQueue action
 */
export interface PickFromQueueResponse {
  // No content returned
}

/**
 * PickFromQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queueitem)
 */
export class PickFromQueueAction implements Executable<PickFromQueueResponse> {
  constructor(
    public readonly queueitemId: string,
    public readonly systemUser: systemuser,
    public readonly removeQueueItem: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.PickFromQueue`;

    const body: Record<string, unknown> = {
      SystemUser: this.systemUser,
      RemoveQueueItem: this.removeQueueItem,
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

  async parseResponse(response: Response): Promise<PickFromQueueResponse> {
    // No return value (204 No Content)
    return {};
  }
}
